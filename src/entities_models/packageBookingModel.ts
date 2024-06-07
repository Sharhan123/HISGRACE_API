import mongoose, { Schema, Document, Model } from "mongoose";
import { Idriver } from "../interfaces/schema/driverSchema";
import { Ibooking } from "../interfaces/schema/bookingSchema";
import { locationFrom } from "./subSchema/locationFrom";
import { pickupDetails } from "./subSchema/pickupDetails";
import { IPbooking } from "../interfaces/schema/packageBookingSchema";
const packageBookingModel: Schema = new Schema<IPbooking & Document>({
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    
    pickupDetails:pickupDetails,
    period:{
        time:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            required:true
        },
        meridian:{
            type:String,
            required:true
        }
    },
    
    person:{
        adult:{
            type:Number,
            required:true
        },
        child:{
            type:Number,
            required:true
        }
    },
    status:{
        type:String,
        required:true,
        default:"Pending"
    },
    package:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Packages', 
        required: true,
    }
    
}) 

const PackageBookingSchema : Model<IPbooking & Document> = mongoose.model<IPbooking & Document>('packageBookings',packageBookingModel)

export default PackageBookingSchema;