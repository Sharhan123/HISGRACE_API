import { Schema } from "mongoose";
import { ItempUserReq,ItempUserRes } from "../schema/tempUser";
import { promises } from "dns";
type ID = Schema.Types.ObjectId

export interface ItempUserRepo{
    saveUser(user:ItempUserReq):Promise<ItempUserRes>
    findById(id:ID):Promise<ItempUserRes | null>
    findByEmail(email:string):Promise<ItempUserRes | null>
}