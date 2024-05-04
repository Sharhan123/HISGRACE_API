import { Schema } from "mongoose";
import { Idriver, IdriverAuth } from "../schema/driverSchema";

export interface IdriversRepo{
    saveDriver(user:IdriverAuth):Promise<Idriver| null>
    findById(id:string):Promise<Idriver | null>
    findByMobile(mobile:String):Promise<Idriver | null>
} 