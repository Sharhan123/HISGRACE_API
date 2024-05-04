import mongoose from "mongoose";
import { adminRepository } from "../infrastructure/respostories/adminRepository";
import { Iadmin } from "../interfaces/adminSchema";
import { IuserRes } from "../interfaces/schema/userSchema";

export class adminUseCase{
    constructor(
        private readonly adminRepository:adminRepository
    ){}

    async exist(email:String):Promise<Iadmin | null>{
        const admin =  await this.adminRepository.findOne(email)
        return admin
        
    }
    async getAllUsers():Promise<IuserRes[] | null>{
        const users = await this.adminRepository.findAllUsers()
        
        
        return users 
    }
    async blockUser(id:string){
        
        const res = await this.adminRepository.userBlock(id)
        return res
    }

}