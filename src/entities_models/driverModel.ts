import mongoose, { Schema, Document, Model } from "mongoose";
import { Idriver } from "../interfaces/schema/driverSchema";
const driverModel: Schema = new Schema<Idriver & Document>({
    
    driverName: {
        type: String,
        required: true
    },
    vehicles: {
        type: [''],
        required: true,
    },
    email:{
        type:String,
        required:true
    },
    age: {
        type: String,
        required: true,
    }, 
    gender: {
        type: String,
        // required:true,
        default:'MALE'
    },
    exp: {
        type: Number,
        required: true
    },
    mobile: {
        type: String,
    },
    driverBata:{
        type:Number,
        required:true
    },
    isAvailble: {
        type: Boolean,
        default:true,
        required: true
    },
    image:{
        type:String,
        required:true
        
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:String || Number,
        required:true
    }
    
})

const driverSchema : Model<Idriver & Document> = mongoose.model<Idriver & Document>('drivers',driverModel);

export default driverSchema;