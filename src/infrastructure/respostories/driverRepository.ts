import { Schema } from "mongoose";
import { IdriversRepo } from "../../interfaces/repos/driverRepository";
import { Idriver, IdriverAuth } from "../../interfaces/schema/driverSchema";
import driverSchema from "../../entities_models/driverModel";

export class driverRepository implements IdriversRepo{
    async  findById(id:string): Promise<Idriver | null> {
        try{
            return await driverSchema.findById(id)
        }catch(err){
            throw err
        }
    }
    async saveDriver(user: IdriverAuth): Promise<Idriver | null> {
        try{
            return await new driverSchema(user).save()
        }catch(err){
            throw err
        }
    }
    async  findByMobile(mobile: String): Promise<Idriver | null> {
        try{
            return await driverSchema.findOne({mobile:mobile})
        }catch(err){
            throw err
        }
    }
    async findAllDriver():Promise<Idriver[]>{
        try{
            return await driverSchema.find({})
        }catch(err){
            throw err
        }
    }
    async updateById(id:Schema.Types.ObjectId,driver:IdriverAuth):Promise<Idriver | null>{
        try{
            return await driverSchema.findByIdAndUpdate(id,{
                $set:{driverName:driver.driverName,age:driver.age,mobile:driver.mobile,gender:driver.gender,exp:driver.exp,driverBata:driver.driverBata,image:driver.image,vehicles:driver.vehicles}
            },{new:true})
        }catch(Err){
            throw Err
        }
    }
    async deleteById(id:string):Promise<Idriver | null>{
        try{
            return await driverSchema.findByIdAndDelete(id)
        }catch(err){
            throw err
        }
    }

    async blockById(id:string):Promise<Idriver|null>{
        try{
            const driver = await driverSchema.findById(id)
            return driverSchema.findByIdAndUpdate(id,{isAvailble:!driver?.isAvailble})
        }catch(err){
            throw err
        }
    }
}