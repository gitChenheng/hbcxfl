// import {getRedisIns} from "@/server/redis";
// import jwt from "jsonwebtoken";
// import JSONResult from "@/utils/JSONResult";

// export const getUid = async (ctx) => {
//     const token = ctx.request.header.token;
//     const redisResult = await getRedisIns().get(token);
//     if (redisResult){
//         return JSON.parse(redisResult).uid
//     }else{
//         return await jwt.verify(token, jwt_secret, null, async (err, decoded) => {//此处解密为异步
//             if (err){
//                 ctx.response.body = JSONResult.authority()
//             }else{
//                 return decoded.uid
//             }
//         });
//     }
// }
// export const getRole = async (ctx, next) => {
//     // const uid = await this.getUid(ctx, next);
//     // cpnst User=model.User;
//     // const user=await User.findById(uid);
//     // return user.role
// }
// export default {
// };
