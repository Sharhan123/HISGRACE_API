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

            let data =  await bookingSchema.findById(id)
            // await bookingSchema.updateMany({type: 'one-way','period.date': { $lt: new Date() }},{ $set: { status: 'Completed' } } )            
            // await bookingSchema.updateMany({type: 'round-way','returnDate': { $lt: new Date() }},{ $set: { status: 'Completed' } } ) 
            return data
        }catch(err){
            throw err
        }
    }
    async findAll():Promise<Ibooking [] | null>{ 
        try{
            await bookingSchema.deleteMany({payment:false})
            // await bookingSchema.updateMany({type: 'one-way','period.date': { $lt: new Date() }},{ $set: { status: 'Completed' } } )            
            // await bookingSchema.updateMany({type: 'round-way','returnDate': { $lt: new Date() }},{ $set: { status: 'Completed' } } )            
        return await bookingSchema.find({payment:true}).populate('vehicle').populate('driver')
        }catch(err){
            throw err
        }
    }
    async findByUserId(id: String): Promise<Ibooking[] | null> {
        try{
            await bookingSchema.deleteMany({payment:false})
            // await bookingSchema.updateMany({type: 'one-way','period.date': { $lt: new Date() }},{ $set: { status: 'Completed' } } )            
            // await bookingSchema.updateMany({type: 'round-way','returnDate': { $lt: new Date() }},{ $set: { status: 'Completed' } } ) 
            
            return await bookingSchema.find({userId:id}).populate('vehicle').populate('driver')
             
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
    async bookingStatus(id:string,status:string):Promise<Ibooking | null>{
        try{
            return await bookingSchema.findByIdAndUpdate(id,{status:status})
        }catch(err){
            throw err
        }
    }

}