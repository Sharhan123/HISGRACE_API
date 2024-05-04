import { Schema } from "mongoose";
import { IdriversRepo } from "../../interfaces/repos/driverRepository";
import { Idriver, IdriverAuth } from "../../interfaces/schema/driverSchema";
import driverSchema from "../../entities_models/driverModel";
import { IbookingRepo } from "../../interfaces/repos/bookingRepo";
import { IbookingAuth, Ibooking } from "../../interfaces/schema/bookingSchema";
import bookingSchema from "../../entities_models/bookingModel";

export class bookingRepository implements IbookingRepo{
    async saveBooking(data: IbookingAuth): Promise<Ibooking | null> {
        try{
            return await new bookingSchema(data).save()
        }catch(err){
            throw err
        }
    }

     async findById(id: string): Promise<Ibooking | null> {
        try{
            return await bookingSchema.findById(id)
        }catch(err){
            throw err
        }
    }
    async findAll():Promise<Ibooking [] | null>{
        try{
            return await bookingSchema.find({payment:true}).populate('vehicle')
        }catch(err){
            throw err
        }
    }
    async findByUserId(id: String): Promise<Ibooking[] | null> {
        try{
            return await bookingSchema.find({userId:id})
        }catch(err){
            throw err
        }
    } 
    async updateStatus(id: string,status:boolean): Promise<Ibooking | null> {
        try{
            console.log('updating',id,status);
            
            return await bookingSchema.findOneAndUpdate({_id:id},{payment:status})
        }catch(err){
            throw err
        }
    }

}