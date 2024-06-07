import { PackageBookingRepository } from "../infrastructure/respostories/packageBookingRepository";
import { IPbookingAuth } from "../interfaces/schema/packageBookingSchema";

export class packageBookingUsecase {
    constructor(
        private readonly packageRepository:PackageBookingRepository
    ){}

    async findById(id:string){
        return this.packageRepository.findById(id)
    }
    async findByUser(id:string){
        return this.packageRepository.findByUserId(id)
    }
    async saveBooking(data:IPbookingAuth){
        return this.packageRepository.saveBooking(data)
    }
    async findAll(){
        return this.packageRepository.findAll()
    }
    async bookingStatus(id:string,status:string){
        return this.packageRepository.updateStatus(id,status)
    }

}