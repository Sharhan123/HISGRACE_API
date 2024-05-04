import { Schema } from "mongoose";
import { IuserAddres } from "../../interfaces/subSchema/userAddress";
import { Ipickup } from "../../interfaces/schema/bookingSchema";

export const pickupDetails : Schema = new Schema<Ipickup>({
    bookingName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },    
    state:{
        type:String,
        required:[true,'state is required']
    },
    postCode:{
        type:String,
        required:[true,'pincode is required']
    }
})

