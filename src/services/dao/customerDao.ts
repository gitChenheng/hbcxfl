import Customer from "@/models/entity/Customer";
import {generateId} from "@/utils/util";
import {dbCtx} from "@/server/db/db_context";
import {CommonExcludeAttributes} from "@/constans/global";

export const getAllCustomer = async () => {
    return await Customer.findAll({
        // attributes: {exclude: [...CommonExcludeAttributes]},
        order: [['created_at','DESC']],
        raw: true,
    });
}

export const createCustomer = async (item) => {
    return await Customer.create(item);
}

export const getCountByPhone = async (phone) => {
    const db = dbCtx();
    return await db.query(
        `
            select count(*) from customer where phone=:phone
            `,
        {
            type: db.QueryTypes.SELECT,
            plain: false,
            raw: true,
            replacements: {
                phone,
            }
        }
    )
}
