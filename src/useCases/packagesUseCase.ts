import mongoose from "mongoose";
import { packageRepository } from "../infrastructure/respostories/packageRepository";
import { Ipackage, IpackageAuth, IpackageEdit } from "../interfaces/schema/packageSchema";

export class packageUseCase {
    constructor(
        private readonly packageRepository:packageRepository
    ){}

    async addPackage(data:IpackageAuth):Promise<Ipackage>{
        return this.packageRepository.savePackage(data)
    }
    async packageExist(id:string):Promise<Ipackage | null>{
        return this.packageRepository.findById(id)
    }

    async getPackages():Promise<Ipackage[] | null>{
        return this.packageRepository.getPackages()
    }
    async editPackage(data:IpackageEdit):Promise<Ipackage | null>{
        return this.packageRepository.editById(data)
    }
    async deletePackage(id:string):Promise<Ipackage | null>{
        return this.packageRepository.deleteById(id)
    }

    async blockAndUnblock(id:string):Promise<Ipackage | null>{
        return this.packageRepository.blockAndUnblock(id)
    }
}