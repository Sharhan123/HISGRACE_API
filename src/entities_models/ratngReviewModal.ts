import mongoose, { Schema, Document, Model } from "mongoose";

import { IreviewRes } from "../interfaces/schema/reviewSchema";
const ReviewSchema: Schema = new Schema<IreviewRes & Document>({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },    
        review:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
    
    vehicle:{
        type:Boolean,
        required:true,
    },
    vehicleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'vehicles', 
    },
    driverId:{
        ref:'drivers',
        type:mongoose.Schema.Types.ObjectId,
    }
    
}) 

const ReviewModel : Model<IreviewRes & Document> = mongoose.model<IreviewRes & Document>('reviews',ReviewSchema)

export default ReviewModel; 