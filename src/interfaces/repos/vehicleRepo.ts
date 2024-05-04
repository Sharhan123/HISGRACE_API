import { Schema } from "mongoose";
import { Ivehicle, IvehicleAuth } from "../schema/vehicleSchema";
type ID = Schema.Types.ObjectId
export interface IvehicleRepo {
    saveVehicle(vehicle:IvehicleAuth):Promise<Ivehicle>
    findAll():Promise<Ivehicle[]>
}