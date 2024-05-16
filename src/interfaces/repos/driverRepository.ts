import { Schema } from "mongoose";
import { Idriver, IdriverAuth } from "../schema/driverSchema";

export interface IdriversRepo{
    saveDriver(user:IdriverAuth):Promise<Idriver| null>
    findById(id:string):Promise<Idriver | null>
    findByEmail(email:String):Promise<Idriver | null>
    
} 