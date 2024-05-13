import mongoose, { Schema, Document, Model } from "mongoose";
import { Ivehicle } from "../interfaces/schema/vehicleSchema";
const vehicleModel: Schema = new Schema<Ivehicle & Document>({
    id:{
        type:Number,
    },
    vehicleName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    fuel: {
        type: String,
        required: true,
    },
    seat: {
        type: Number,
        required:true
        
    },
    startingPrice: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
    },
    desc:{
        type:String,
        required:true
    },
    isBlocked: {
        type: Boolean,
        default:false,
        required: true
    },
    images:{
        type:String,
        required:true
        
    },
    bookings:{
        type:Array<String>
    }
    
})

const vehicleSchema : Model<Ivehicle & Document> = mongoose.model<Ivehicle & Document>('vehicles',vehicleModel);

export default vehicleSchema;