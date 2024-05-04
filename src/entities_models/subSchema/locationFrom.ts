import { Schema } from "mongoose";
import { IuserAddres } from "../../interfaces/subSchema/userAddress";
import { Ilocation } from "../../interfaces/schema/bookingSchema";

export const locationFrom : Schema = new Schema<Ilocation>({
    name:{
        type:String,
        
    },
    city:{
        type:String,
       
    },
    county:{
        type:String,
        
    },
    address_line1:{
        type:String,
    },
    address_line2:{
        type:String,
    },
    country_code:{
        type:String,
    },
    formatted:{
        type:String,
    },
    place_id:{
        type:String,
    },
    state_code:{
        type:String,
    },
    lat:{
        type:Number,
    },
    lon:{
        type:Number,
    },
    country:{
        type:String,
        required:[true,'country is required']
    },
    state:{
        type:String,
        required:[true,'state is required']
    },
    postcode:{
        type:String,
    }
})

