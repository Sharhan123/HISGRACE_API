import { Schema } from "mongoose"
type ID = Schema.Types.ObjectId
import { Iuser,IuserRes,IuserAuth } from "../schema/userSchema"
export interface IuserRepo{

    saveUser(user:IuserAuth):Promise<Iuser>
    findById(id:ID):Promise<Iuser|null>
    findByEmail(email:String,id:Schema.Types.ObjectId | undefined):Promise<Iuser|null>
    
} 