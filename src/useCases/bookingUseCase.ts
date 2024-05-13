import { Schema } from "mongoose";
import { bookingRepository } from "../infrastructure/respostories/bookingRepository";
import { IbookingAuth } from "../interfaces/schema/bookingSchema";

export class bookingusecase {
    constructor(
        private readonly bookingRepository:bookingRepository
    ){}
    async findById(id:string){
        return this.bookingRepository.findById(id)
    }
    async findByUser(id:string){
        return this.bookingRepository.findByUserId(id)
    }
    async saveBooking(data:IbookingAuth){
        return this.bookingRepository.saveBooking(data)
    }
    async updatePayment(id:string,status:boolean){
        return this.bookingRepository.updateStatus(id,status)
    }
    async findAll(){
        return this.bookingRepository.findAll()
    }
    async bookingStatus(id:string,status:string){
        return this.bookingRepository.bookingStatus(id,status)
    }
    
}