import mongoose, { Schema,Document ,Model} from "mongoose";
import { ItempUserRes } from "../interfaces/schema/tempUser";

const tempUserSchema : Schema = new Schema<ItempUserRes & Document>({
    name:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required: true
    },
    email:{
      type:String,
      required: true  
    },
    password:{
        type:String,
        required:true
    }
})


export const tempUserModel:Model<ItempUserRes & Document> = mongoose.model<ItempUserRes & Document>('tempUsers',tempUserSchema);

