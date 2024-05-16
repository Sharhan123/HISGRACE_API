import mongoose, { Schema, Document, Model } from "mongoose";
import { Idriver } from "../interfaces/schema/driverSchema";
import { Ibooking } from "../interfaces/schema/bookingSchema";
import { locationFrom } from "./subSchema/locationFrom";
import { pickupDetails } from "./subSchema/pickupDetails";
const bookingModel: Schema = new Schema<Ibooking & Document>({
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    from: locationFrom,
    to: locationFrom,
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'vehicles', 
        required: true,
    },
    distance: {
        type: Number,
        required:true
        
    },
    totalKm: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    driver:{
        type:Schema.Types.ObjectId,
        ref:'driver',
        required:true
    },
    payment: {
        type: Boolean,
        default:false,
        required: true
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
        }
    },
    returnDate:{
        type:Date
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
        default:"Active"
    },
    type:{
        type:String,
        required:true,
    }
    
}) 

const bookingSchema : Model<Ibooking & Document> = mongoose.model<Ibooking & Document>('bookings',bookingModel)

export default bookingSchema;