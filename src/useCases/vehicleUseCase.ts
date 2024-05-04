import { vehicleRepository } from "../infrastructure/respostories/vehicleRepositories";
import { Ivehicle, IvehicleAuth, IvehicleRes } from "../interfaces/schema/vehicleSchema";

export class vehicleUseCase {
    constructor(
        private readonly vehicleRepository:vehicleRepository
    ){}

    async addVehicle(vehicle:IvehicleAuth):Promise<IvehicleRes>{
        const vehicleRes:IvehicleRes = await this.vehicleRepository.saveVehicle(vehicle)
        return vehicleRes
    }
    async getAllvehicles():Promise<IvehicleRes[]>{
        return this.vehicleRepository.findAll()
    }
    async vehicleExist(id:string):Promise<IvehicleRes | null>{
        return this.vehicleRepository.checkExist(id)
    }
    async findVehicle(id:string):Promise<IvehicleRes | null>{
        return this.vehicleRepository.findById(id)
    }
    async deleteVehicle(id:string):Promise<IvehicleRes | null>{
        return this.vehicleRepository.deleteById(parseFloat(id))
    }
    async updateVehicle(data:IvehicleAuth):Promise<IvehicleAuth | null>{
        return this.vehicleRepository.updateByID(data)
    }
    async blockAndUnblock(id:string):Promise<IvehicleRes | null>{
        return this.vehicleRepository.BlockByID(id)
    }
}