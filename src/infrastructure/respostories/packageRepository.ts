import mongoose from "mongoose";
import packageSchema from "../../entities_models/packageModel";
import { IpackageRepo } from "../../interfaces/repos/packageRepo";
import { IpackageAuth, Ipackage, IpackageEdit } from "../../interfaces/schema/packageSchema";

export class packageRepository implements IpackageRepo{
    async savePackage(data: IpackageAuth): Promise<Ipackage> {
        try{
            return await new packageSchema(data).save()
        }catch(err){
            console.log(err);
            throw err
        }
    }

    async  getPackages(): Promise<Ipackage[] | null> {
        try{
            return await packageSchema.find().populate('vehicle')
        }catch(err){
            console.log(err);
            throw err
            
        }
    }
async findById(id:string):Promise<Ipackage | null>{
    try{
        return await packageSchema.findById(id)
    }catch(err){
        throw err
    }
}
    async editById(data:IpackageEdit) : Promise<Ipackage | null>{
        try{ 
      return await packageSchema.findByIdAndUpdate(data.id,{title:data.title,desc:data.desc,days:data.days,vehicle:data.vehicle,perDay:data.perDay,total:data.total,location:data.location,image:data.image})      
        }catch(err){

            console.log(err);
            throw err
        }
    }
    async deleteById(id:string):Promise<Ipackage | null>{
        try{
            return await packageSchema.findByIdAndDelete(id)
        }catch(err){
            console.log(err)
            throw err
        }
    }

    async blockAndUnblock(id:string):Promise<Ipackage | null>{
        try{
            const blocked = await this.findById(id)
            return await packageSchema.findByIdAndUpdate(id,{isAvailable:!blocked?.isAvailable})
        }catch(err){
            throw err
        }
    }
}