import {getAllCustomer,createCustomer,getCountByPhone} from "@/services/dao/customerDao";
import {_compare, _hash} from "@/utils/hash";
import {sign} from "@/middlewares/jwt";
import {setRedisData, getRedisData} from "@/services/common/redisSer";
import {JWT_SECRET} from "@/constans/global";
import jwt from "jsonwebtoken";

export const findAllCustomer = async () => {
    return await getAllCustomer();
}

export const addCustomer = async (item) => {
    return await createCustomer(item);
}
