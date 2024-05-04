import { Schema } from "mongoose";
import vehicleSchema from "../../entities_models/vehicleModel";
import { IvehicleRepo } from "../../interfaces/repos/vehicleRepo";
import { Ivehicle, IvehicleAuth, IvehicleRes } from "../../interfaces/schema/vehicleSchema";

export class vehicleRepository implements IvehicleRepo{
     async saveVehicle(vehicle: IvehicleAuth): Promise<Ivehicle> {
        try{
            console.log("saving vehicle");
            
            return await new vehicleSchema(vehicle).save()

        }catch(err){
            console.log(err);
            throw err
        }
    }
    async findAll():Promise<IvehicleRes[]> {
        try{

            return await vehicleSchema.find({})

        }catch(err){
            console.log(err);
            throw err
        }
    }
    async deleteById(id:number):Promise<IvehicleRes | null>{
        try{
            return await vehicleSchema.findOneAndDelete({id:id})
        }catch(err){
            console.log(err);
            throw err
        }
    }

    async findById(id:string):Promise<IvehicleRes | null>{
        try{
            return await vehicleSchema.findById(id)
        }catch(err){
            console.log(err);
            throw err
        }
    }
    async checkExist(id:string):Promise<IvehicleRes | null>{
        try{
            return await vehicleSchema.findOne({id:id})
        }catch(err){
            throw err
        }
    }
    async updateByID(data:IvehicleAuth):Promise<IvehicleAuth | null>{
        try{
            return await vehicleSchema.findOneAndUpdate({id:data.id},{vehicleName:data.vehicleName,type:data.type,desc:data.desc,fuel:data.fuel,seat:data.seat,startingPrice:data.startingPrice,price:data.price,images:data.images})
        }catch(err){
            console.log(err);
            throw err 
        }
    }
    async BlockByID(id:string):Promise<IvehicleRes | null>{
        try{
            const vehicle = await vehicleSchema.findById(id)
            return await vehicleSchema.findByIdAndUpdate(id,{isBlocked:!vehicle?.isBlocked})
        }catch(err){
            throw err
        }
    }
}