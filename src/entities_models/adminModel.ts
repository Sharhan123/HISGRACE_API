import mongoose, { Schema,Document ,Model} from "mongoose";
import { ItempUserRes } from "../interfaces/schema/tempUser";
import { Iadmin } from "../interfaces/adminSchema";

const adminSchema : Schema = new Schema<Iadmin & Document>({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


export const adminModel:Model<Iadmin & Document> = mongoose.model<Iadmin & Document>('admin',adminSchema);

