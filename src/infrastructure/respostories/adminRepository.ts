import mongoose from "mongoose";
import { adminModel } from "../../entities_models/adminModel";
import userSchema from "../../entities_models/userModel";
import { Iadmin } from "../../interfaces/adminSchema";
import { IadminRepo } from "../../interfaces/repos/adminRepo";
import { IuserRes } from "../../interfaces/schema/userSchema";

export class adminRepository implements IadminRepo{
   async findOne(email:String):Promise<Iadmin | null> {

    console.log(email);
    
        const admin = await adminModel.findOne({email:email})
       console.log(admin);
       
        
        return admin 
    }
    async findAllUsers(): Promise<IuserRes[]> {
        try{ 

            return await userSchema.find({});
        }catch(err){
            console.log(err);
            throw err
        }
    }
    async userBlock(id:string){
        try{
            const user = await userSchema.findById(id)
            let userBlock = !user?.isBlocked
            
            const res = await userSchema.findByIdAndUpdate(id,{isBlocked:userBlock},{new:true})
            return res
            
        }catch(err){
            throw err
        }
    }
}