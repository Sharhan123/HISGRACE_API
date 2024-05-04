import mongoose, { Schema } from "mongoose"

export interface Iadmin{
    _id?:Schema.Types.ObjectId
    email:String,
    password:String
}