import mongoose, { Schema } from "mongoose";
import { IuserAddres } from "../subSchema/userAddress";
 type ID = Schema.Types.ObjectId

export interface Iuser {
    _id:ID
    name:String
    email:String
    password:String
    mobile?:Number
    gender?:String
    secondaryMobile?:Number
    age?:String,
    otp:number,
    language?:String
    profile?:String
    isBlocked:boolean
    address?:IuserAddres
    lastseen:Date,
    unRead:Number
    newMessage:Number
}

export interface IuserRes extends Iuser {}
export interface IuserAuth{
    name:String,
    email:String,
    password:String
}
export interface IuserReq extends IuserAuth{
    number: Number,
    cpassword:String
}
export interface IuserApiRes{
    status:number,
    message:String,
    data:Iuser|null
}
export interface IuserApiAuth extends IuserApiRes{
accessToken:String,
refreshToken:String,
role:String
}


export interface IuserEdit{
    
    name:string,
    email:string
    age:string
    gender:string
    language:string
    mobile:string
    secondaryMobile:string
}