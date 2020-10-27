import {ENV_PROD} from "@/constans/global";

export default () => {
    return async (ctx, next) => {
        // if (process.env.NODE_ENV === ENV_PROD){
        //     ctx.set("Access-Control-Allow-Origin", "https://localhost:8001");
        // } else {
        //     ctx.set("Access-Control-Allow-Origin", "*");
        // }
        ctx.set("Access-Control-Allow-Origin", "http://localhost:3001");
        ctx.set("Access-Control-Allow-Credentials", "false");
        ctx.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
        ctx.set("Access-Control-Allow-Headers", "Content-Type,Authorization,Accept,token,x-requested-with");
        // ctx.set("X-XSS-Protection", "1; mode=block");
        // ctx.set("Content-Security-Policy", "default-src \'self\' code.jquery.com;form-action \'self\'");
        // ctx.set("X-FRAME-OPTIONS", "DENY");
        if (ctx.method === "OPTIONS"){
            ctx.set("Access-Control-Max-Age", 3600 * 24);
            ctx.body = ""
        }
        await next();
    }
};
