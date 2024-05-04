import { Schema } from "mongoose"

export interface Idriver{
    _id:Schema.Types.ObjectId
    driverName:String
    vehicles:Array<String>
    age:String,
    gender:String,
    exp:Number,
    mobile:String,
    isAvailble:boolean,
    image:String,
    driverBata:Number
}

export interface IdriverAuth{
    driverName:String,
    vehicles:Array<String>
    age:String
    gender:String
    exp:Number
    mobile:String
    image:String
    driverBata:Number
}