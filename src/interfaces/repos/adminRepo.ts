import { Iadmin } from "../adminSchema";
import { IuserRes } from "../schema/userSchema";

export interface IadminRepo{
    findOne(email:String):Promise<Iadmin | null>
    findAllUsers():Promise<IuserRes[]>

}