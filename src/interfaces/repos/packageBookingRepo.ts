import { Schema } from "mongoose";
import { IPbooking, IPbookingAuth } from "../schema/packageBookingSchema";

export interface IPbookingRepo{
    saveBooking(data:IPbookingAuth):Promise<IPbooking | null>
    findById(id:string):Promise<IPbooking | null>
    findByUserId(id:String):Promise<IPbooking[] | null>
    updateStatus(id:string,status:string):Promise<IPbooking | null>
} 