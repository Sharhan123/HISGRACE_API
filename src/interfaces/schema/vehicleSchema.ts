import { Schema } from "mongoose"

type ID = Schema.Types.ObjectId
export interface Ivehicle {
    _id:ID
    id:number
    vehicleName:String
    type:String
    fuel:String
    seat:Number
    startingPrice:Number
    price:Number
    desc:String
    images:String
    isBlocked:boolean
    bookings?:string[]
    reviews:{user:any,review:Number}[]
}



export interface IvehicleAuth{
    id:number
    vehicleName:String
    type:String
    fuel:String
    seat:Number
    startingPrice:Number
    price:Number
    desc:String
    images:Array<String>
}

export interface IvehicleRes extends Ivehicle{

}