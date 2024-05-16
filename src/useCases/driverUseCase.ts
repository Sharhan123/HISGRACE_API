import { Schema } from "mongoose";
import { driverRepository } from "../infrastructure/respostories/driverRepository";
import { IdriverAuth } from "../interfaces/schema/driverSchema";
import { mailSender } from "../providers/nodeMailer";

export class driverUseCase {
    constructor(
        private readonly driverReository:driverRepository,
        private readonly mailer:mailSender
    ){}
    async findDriverById(id:string){ 
        return this.driverReository.findById(id)
    }
    sendTimeoutOTP( email: string, OTP: number,name:string) {
        try {
            this.mailer.sendDriverOtp(email, OTP ,name)
                    
            // setTimeout(async() => {
            //     await this.driverReository.unSetOtp(email)
            // }, 60000)

        } catch (error) {
            console.log(error);
            throw Error('Error while sending timeout otp')
        }
    }
    updateVerification(email:string){
        return this.driverReository.updateStatus(email)
    }
    async isExist(mobile:String){
        return this.driverReository.findByEmail(mobile)
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
    async updateRequest(id:any,status:string){
        return this.driverReository.updateRequest(id,status)
    }
    async sentRequestMail(email:string,status:string,name:string){
        this.mailer.sendRequestMail(email,name,status)
        return
    }
    async removeById(id:any){
        return this.driverReository.removeById(id)
    }
}