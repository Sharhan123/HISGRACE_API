import userSchema from "../../entities_models/userModel";
import { IuserRepo } from "../../interfaces/repos/userRepo";
import { Iuser, IuserAuth, IuserEdit, IuserRes } from "../../interfaces/schema/userSchema";
import { Schema } from "mongoose";
type ID = Schema.Types.ObjectId

export class UserRepository implements IuserRepo {
    async saveUser(user: Iuser | IuserAuth): Promise<Iuser> {
        try {
            console.log("saving user", user)
            return await new userSchema(user).save();
        } catch (err) {
            console.log(err);
            throw err
        }
    }

    async findById(id: ID): Promise<Iuser | null> {
        try {

           
            return await userSchema.findById(id);
        } catch (err) {
            console.log(err);
            throw err
        }
    }
    async findByEmail(email: String , id:Schema.Types.ObjectId | undefined ): Promise<Iuser | null> {
        try {
            let query =  userSchema.findOne({email:email})
            if(id){
                query = query.where('_id').ne(id)
            }
            
           
            return await query.exec()
        } catch (err) {
            console.log(err);
            throw err
        }
    }

    async setotp(email: string, otp: number): Promise<Iuser | null> {
        try {
            return await userSchema.findOneAndUpdate({ email: email }, { $set: { otp: otp } })
        } catch (err) {
            console.log(err);
            throw err

        }
    }
    async unsetOtp(email: string): Promise<Iuser | null> {
        try {
            return await userSchema.findOneAndUpdate({ email: email }, { $unset: { otp: 1 } })
        } catch (err) {
            console.log(err);
            throw err

        }
    }

    async updatePassword(pass: string, email: string): Promise<Iuser | null> {
        try {
            return await userSchema.findOneAndUpdate({ email: email }, { $set: { password: pass } })
        } catch (err) {
            console.log(err);
            throw err

        }
    }

    async updateImage(image: string, id: ID): Promise<Iuser | null> {
        try {
            return await userSchema.findByIdAndUpdate(id, { $set: { profile: image } }, { new: true })
        } catch (err) {
            throw err
        }
    }

    async updateUserDetails(id: Schema.Types.ObjectId, user: IuserEdit): Promise<Iuser | null> {
        try {
            return await userSchema.findByIdAndUpdate(id, {
                $set: {
                 name:user.name,
                 email:user.email,
                 age:user.age,
                 gender:user.gender,
                 mobile:user.mobile,
                 secondaryMobile:user.secondaryMobile,
                 language:user.language   
                }
            })
        } catch (err) {
            throw err
        }
    }


}