import {Table, Column, AllowNull, PrimaryKey, Unique} from "sequelize-typescript";
import { STRING, TINYINT, BOOLEAN, TEXT} from "sequelize";
import BaseEntity from "../common/BaseEntity";

@Table({tableName: "customer"})
export default class Customer extends BaseEntity{

    @AllowNull(false)
    @Column(STRING(30))
    public name: string;

    @AllowNull(false)
    @Column(STRING(20))
    public phone: string;

    @AllowNull
    @Column(STRING(30))
    public platform: string;

    @AllowNull
    @Column(STRING(20))
    public money: string;

    @AllowNull
    @Column(TEXT)
    public content: string;

}
