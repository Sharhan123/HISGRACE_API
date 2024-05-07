import { Mongoose, Schema } from "mongoose";
import { IMessage, ImessageRes } from "../schema/chatSchema";

export interface IchatRepo{
    saveChat(data:IMessage):Promise<ImessageRes | null>
    findById(id:any):Promise<ImessageRes[] | null>

} 