
import { IbookingRepo } from "../../interfaces/repos/bookingRepo";
import { IbookingAuth, Ibooking } from "../../interfaces/schema/bookingSchema";
import bookingSchema from "../../entities_models/bookingModel";
import { IPbookingRepo } from "../../interfaces/repos/packageBookingRepo";
import { IPbooking, IPbookingAuth } from "../../interfaces/schema/packageBookingSchema";
import PackageBookingSchema from "../../entities_models/packageBookingModel";

export class PackageBookingRepository implements IPbookingRepo{
    async saveBooking(data: IPbookingAuth): Promise<IPbooking | null> {
        try{
            return await new PackageBookingSchema(data).save()
        }catch(err){
            throw err
        }
    }

     async findById(id: string): Promise<IPbooking | null> {
        try{

            let data =  await PackageBookingSchema.findById(id)
            // await bookingSchema.updateMany({type: 'one-way','period.date': { $lt: new Date() }},{ $set: { status: 'Completed' } } )            
            // await bookingSchema.updateMany({type: 'round-way','returnDate': { $lt: new Date() }},{ $set: { status: 'Completed' } } ) 
            return data
        }catch(err){
            throw err
        }
    }
    async findAll():Promise<IPbooking [] | null>{ 
        try{            
        return await PackageBookingSchema.find({}).populate({
            path: 'package',
            populate: {
                path: 'vehicle'
            }
        });
        }catch(err){
            throw err
        }
    }
    async findByUserId(id: String): Promise<IPbooking[] | null> {
        try{    
            console.log('heyy');
            
            const data =  await PackageBookingSchema.find({userId:id}).populate({
                path: 'package',
                populate: {
                    path: 'vehicle'
                }
            });
            console.log(data);

            return data
        }catch(err){
            throw err
        }
    } 
    async updateStatus(id: string,status:string): Promise<IPbooking | null> {
        try{
            console.log('updating',id,status);
            
            return await PackageBookingSchema.findOneAndUpdate({_id:id},{status:status})
        }catch(err){
            throw err
        }
    }
    

}