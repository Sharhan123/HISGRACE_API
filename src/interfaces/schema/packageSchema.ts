import mongoose, { Schema } from "mongoose";

export interface Ipackage{
    _id:mongoose.Types.ObjectId,
    title:String,
    vehicle:Schema.Types.ObjectId,
    days:Number,
    perDay:Number,
    total:Number,
    location:String
    desc:String,
    image:String,
    isAvailable:boolean
}

export interface IpackageAuth{
    title:String,
    vehicle:String,
    days:Number,
    total:Number,
    location:String
    perDay:Number,
    desc:String,
    image:String
}

export interface IpackageEdit extends IpackageAuth{
id:mongoose.Types.ObjectId
}