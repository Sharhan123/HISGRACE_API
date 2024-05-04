import mongoose, { Schema, Document, Model } from "mongoose";
import { Ivehicle } from "../interfaces/schema/vehicleSchema";
import { Ipackage } from "../interfaces/schema/packageSchema";
const PackageModel: Schema = new Schema<Ipackage & Document>({
    
    title: {
        type: String,
        required: true
    },
    vehicle: {
        type: Schema.Types.ObjectId,
        ref:'vehicles',
        required: true,
    },
    days: {
        type: Number,
        required: true,
    },
    perDay: {
        type: Number,
        required:true
        
    },
    total: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    isAvailable: {
        type: Boolean,
        default:false,
        required: true
    }
     
})

const packageSchema : Model<Ipackage & Document> = mongoose.model<Ipackage & Document>('Packages',PackageModel);

export default packageSchema ;