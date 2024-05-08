import mongoose, { Schema, Document, Model } from "mongoose";
import { Iuser } from "../interfaces/schema/userSchema";
import { AddressSchema } from "./subSchema/userAddress";
const userModel: Schema = new Schema<Iuser & Document>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        
    },
    secondaryMobile:{
        type:Number
    },
    profile: {
        type: String
    },
    otp:{
        type:Number
    },
    gender:{
        type:String
    },
    age: {
        type: String,
    },
    language:{
        type:String
    },
    isBlocked: {
        type: Boolean,
        default:false,
        required: true
    },
    address:AddressSchema,
    lastseen:{type:Date,required:true,default:Date.now()}
})

const userSchema : Model<Iuser & Document> = mongoose.model<Iuser & Document>('Users',userModel);

export default userSchema;