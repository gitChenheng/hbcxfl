import {addCustomer,findAllCustomer} from "@/services/customerSer";
import {Ctrl, Api, Get, Post, View} from "@/decorators/action";
import JSONResult from "@/utils/JSONResult";
import {Context} from "koa";
import {getCountByPhone} from "@/services/dao/customerDao";
// import {js_code2_session} from "@/services/common/wx";
// import {utf16toEntities} from "@/utils/util";
// import WXBizDataCrypt from "@/utils/watermark/WXBizDataCrypt";

@Ctrl
export default class CustomerController{

    @Api
    @Post
    public static async getAllCustomers(ctx: Context){
        const body = ctx.request.body;
        if(body.token !== "apmjhiuhwf1341nsuhi8hfwndwsf"){
            ctx.rest(JSONResult.err('token err'));
            return ;
        }
        try {
            const res = await findAllCustomer();
            ctx.rest(JSONResult.ok(res));
        }catch (e) {
            ctx.rest(JSONResult.err());
        }
    }

    @Api
    @Post
    public static async addCustomer(ctx: Context){
        const body = ctx.request.body;
        if(!body.name){
            ctx.rest(JSONResult.err('缺少名称'));
            return ;
        }
        if(!body.phone){
            ctx.rest(JSONResult.err('缺少电话'));
            return ;
        }
        try {
            const countRes = await getCountByPhone(body.phone);
            const count = countRes[0]['count(*)'];
            if(count){
                ctx.rest(JSONResult.err('该手机号码已存在，请勿重复提交'));
                return ;
            }
            const res = await addCustomer(body);
            if(res)
            ctx.rest(JSONResult.ok());
        }catch (e) {
            ctx.rest(JSONResult.err());
        }
    }

}







