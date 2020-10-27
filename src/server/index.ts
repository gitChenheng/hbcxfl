/**
 * by Chase Chen.
 */
import "module-alias/register";
import config from "@/config/config";
import {ENV_PROD} from "@/constans/global";
import fs from "fs";
import path from "path";
import http from "http";
import https from "https";
import Koa from "koa";
import serve from "koa-static";
import bodyParser from "koa-bodyparser";
import cors from "@/middlewares/intercepter/cors";
import {verify} from "@/middlewares/jwt";
import {restIfy} from "@/middlewares/intercepter/rest";
import koaBody from "koa-body";
import router from "../middlewares/routeHandler";
import {createDbContext} from "@/server/db/db_context";
import {createRedisIns} from "@/server/redis";
import helmet from "koa-helmet";
import {httpLogger} from "@/utils/logUtil/logger";
import views from "koa-views";
// import socketIo from "socket.io";

const app = new Koa();
createDbContext();
createRedisIns();
app.use(helmet());

if (process.env.NODE_ENV === ENV_PROD){
    import("koa-sslify").then(enforceHttps => {
        app.use(enforceHttps.default());
    })
}
app.use(serve(path.join(process.cwd(), "/src/public/")));
app.use(cors());
app.use(httpLogger());
app.use(verify());
app.use(koaBody({
    multipart: true,
    formidable: {maxFileSize: 200 * 1024 * 1024}
}));
app.use(bodyParser());
app.use(restIfy());
app.use(views(`${process.cwd()}/src/public/views`, {
    extension: 'ejs'
}))
app.use(router.routes()).use(router.allowedMethods());


// router.get('/', async (ctx) =>{
//     await ctx.render('index', {
//         title: 'index',
//         arr: [],
//     })
// })
// app.use(async(ctx)=>{
//     let title = 'hello lval'
//     await ctx.render('index',{title})
// })


if (process.env.NODE_ENV === ENV_PROD){
    const options = {
        key: fs.readFileSync(`${process.cwd()}/src/https/2_www.denominator.online.key`),
        cert: fs.readFileSync(`${process.cwd()}/src/https/1_www.denominator.online_bundle.crt`)
    };
    const httpsServer = https.createServer(options, app.callback());
    httpsServer.listen(config.node.port, () => {
        console.log(`start at port ${config.node.port}`)
    });
} else {
    const httpServer = http.createServer(app.callback());
    httpServer.listen(config.node.port, () => {
        console.log(`start at port ${config.node.port}`)
    });
    // const io = socketIo(httpServer);
    // io.of("chat").on("connection", (socket) => {
    //     console.log('connection chat');
    //     io.to("chat").emit("enter", "welcome")
    // })
    // io.of("chat").use((socket) => {
    //     const query = socket.request._query;
    //     const token = query.token;
    //     console.log(token);
    // })
    // io.on("connection", (socket) => {// io.emit代表广播，socket.emit代表私发
    //     console.log('connection main')
    //     // console.log('req', socket.req)
    //     // console.log('query', socket.query)
    //     // io.emit("enter", `${socket.nickname} comes in`);
    //     // socket.emit("enter", `${socket.nickname} u are welcome`);
    //
    //     socket.on("message", (str) => {
    //         console.log(str)
    //         // io.emit("message", socket.nickname + ' says: ' + str)
    //     })
    //
    //     // 客户端断开，自带事件
    //     socket.on("disconnect", () => {
    //         // io.emit("leave", `${socket.nickname} left`)
    //     })
    // })
}
