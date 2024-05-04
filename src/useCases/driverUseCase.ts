import { Schema } from "mongoose";
import { driverRepository } from "../infrastructure/respostories/driverRepository";
import { IdriverAuth } from "../interfaces/schema/driverSchema";

export class driverUseCase {
    constructor(
        private readonly driverReository:driverRepository
    ){}
    async findDriverById(id:string){
        return this.driverReository.findById(id)
    }
    async isExist(mobile:String){
        return this.driverReository.findByMobile(mobile)
    }
    async saveDriver(driver:IdriverAuth){
        return this.driverReository.saveDriver(driver)
    }
    async getDrivers(){
        return this.driverReository.findAllDriver()
    }
    async updateDriver(id:Schema.Types.ObjectId,driver:IdriverAuth){
        return this.driverReository.updateById(id,driver)
    }
    async deleteDriver(id:string){
        return this.driverReository.deleteById(id)
    }
    async blockDriver(id:string){
        return this.driverReository.blockById(id)
    }
}