import Message from "../../entities_models/chatModel";
import lastseenSchema from "../../entities_models/lastSeenUser";
import { IchatRepo } from "../../interfaces/repos/chatRepo";
import { IMessage, Ilastseen, IlastseenRes, ImessageRes } from "../../interfaces/schema/chatSchema";

export class chatRepository implements IchatRepo{
    async saveChat(data: IMessage): Promise<ImessageRes | null> {
       try{
        return await new Message(data).save()
        }catch(err){
            throw err
        }
    }

     async findById(id: any): Promise<ImessageRes[] | null> {
        try{
            return await Message.find({$or:[{reciever:id},{sender:id}]})
        }catch(err){
            throw err
        }
    }
    async saveLast(data: Ilastseen): Promise<IlastseenRes | null> {
        try{
            return await new lastseenSchema(data).save()
        }catch(err){
            throw err
        }
    }

     async findLastById(id: string): Promise<IlastseenRes | null> {
        try{
            return await lastseenSchema.findOne({userId:id})
        }catch(err){
            throw err
        }
    }
}