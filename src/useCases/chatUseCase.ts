import { chatRepository } from "../infrastructure/respostories/chatRepository";
import { IMessage } from "../interfaces/schema/chatSchema";

export class chatUsecase {
    constructor(
        private readonly chatRepository:chatRepository
    ) {}

    async saveChats(data:IMessage){
        return await this.chatRepository.saveChat(data)
    }
    async findChats(id:any){
        return await this.chatRepository.findById(id)
    }
}