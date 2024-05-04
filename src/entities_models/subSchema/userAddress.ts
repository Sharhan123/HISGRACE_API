import { Schema } from "mongoose";
import { IuserAddres } from "../../interfaces/subSchema/userAddress";

export const AddressSchema : Schema = new Schema<IuserAddres>({
    country:{
        type:String,
        required:[true,'country is required']
    },
    state:{
        type:String,
        required:[true,'state is required']
    },
    city:{
        type:String,
        required:[true,'city is required']
    },
    pincode:{
        type:Number,
        required:[true,'pincode is required']
    }
})

