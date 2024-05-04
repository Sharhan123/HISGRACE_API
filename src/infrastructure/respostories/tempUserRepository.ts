import { ItempUserRepo } from '../../interfaces/repos/tempUserRepo'
import { ItempUserReq, ItempUserRes } from '../../interfaces/schema/tempUser'
import { tempUserModel } from '../../entities_models/tempUserModel'
import { Schema } from 'mongoose'
export class tempUserRepository implements ItempUserRepo {
    async saveUser(user: ItempUserReq): Promise<ItempUserRes> {
        return await new tempUserModel(user).save()
    }
    async findByEmail(email: string): Promise<ItempUserRes | null> {
        return await tempUserModel.findOne({ email: email })
    }
    async findById(id: Schema.Types.ObjectId): Promise<ItempUserRes | null> {
        return await tempUserModel.findById(id)
    }
     async unsetOtp(id: Schema.Types.ObjectId, email: string): Promise<ItempUserRes | null> {
        return await tempUserModel.findByIdAndUpdate(
            { _id: id, email },
            { $unset: { otp: 1 } },
            { new: true } // This option returns the modified document
        );
    }
    async resendSave(id:Schema.Types.ObjectId,otp:number):Promise<ItempUserRes | null>{
        try{
            return await tempUserModel.findByIdAndUpdate(id,{$set:{otp:otp}})
        }catch(err){
            console.log(err);
            throw err
            
        }
    }
}