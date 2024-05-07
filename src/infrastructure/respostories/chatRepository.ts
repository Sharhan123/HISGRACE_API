import Message from "../../entities_models/chatModel";
import { IchatRepo } from "../../interfaces/repos/chatRepo";
import { IMessage, ImessageRes } from "../../interfaces/schema/chatSchema";

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
}