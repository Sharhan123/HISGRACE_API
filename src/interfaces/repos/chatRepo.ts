import { Mongoose, Schema } from "mongoose";
import { IMessage, Ilastseen, IlastseenRes, ImessageRes } from "../schema/chatSchema";

export interface IchatRepo{
    saveChat(data:IMessage):Promise<ImessageRes | null>
    findById(id:any):Promise<ImessageRes[] | null>
    saveLast(data:Ilastseen):Promise<IlastseenRes | null>
    findLastById(id:string):Promise<IlastseenRes | null>
} 