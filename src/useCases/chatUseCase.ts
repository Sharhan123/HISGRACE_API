import { chatRepository } from "../infrastructure/respostories/chatRepository";
import { IMessage, Ilastseen } from "../interfaces/schema/chatSchema";

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
    async saveLastseen(data:Ilastseen){
        return await this.chatRepository.saveLast(data)
    }
    async findLastseen(id:string){
        return await this.chatRepository.findLastById(id)
    }
}