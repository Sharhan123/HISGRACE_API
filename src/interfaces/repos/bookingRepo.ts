import { Schema } from "mongoose";
import { Idriver, IdriverAuth } from "../schema/driverSchema";
import { Ibooking, IbookingAuth } from "../schema/bookingSchema";

export interface IbookingRepo{
    saveBooking(data:IbookingAuth):Promise<Ibooking| null>
    findById(id:string):Promise<Ibooking | null>
    findByUserId(id:String):Promise<Ibooking[] | null>
    updateStatus(id:string,status:boolean):Promise<Ibooking | null>
} 