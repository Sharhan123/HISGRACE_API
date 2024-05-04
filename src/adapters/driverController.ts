import { Request, Response } from "express";
import { STATUS_CODES } from "../constants/httpStatusCodes";
import { driverUseCase } from "../useCases/driverUseCase";
import { removeImage, uploadImageToCloudinary } from "../providers/cloudinart";
import { IdriverAuth } from "../interfaces/schema/driverSchema";
import { IvehicleAuth } from "../interfaces/schema/vehicleSchema";

export class driverController {
    constructor(
        private readonly driverusecase : driverUseCase
    ){}

    async addDriver(req:Request,res:Response){
        try{
            const {name,vehicles,age,gender,mobile,exp,driverBata,image} = req.body

            const driver = await this.driverusecase.isExist(mobile)

            if(driver){
                return res.status(STATUS_CODES.CONFLICT).json({message:'Mobile number already exist , driver already added',role:'mobile'})
            }

            const imageUrl = await uploadImageToCloudinary(image)

            const driverData:IdriverAuth = {
                driverName:name,
                age:age,
                gender:gender,
                vehicles:vehicles,
                mobile:mobile,
                exp:exp,
                driverBata:driverBata,
                image:imageUrl
            }

            const data = await this.driverusecase.saveDriver(driverData)

            return res.status(STATUS_CODES.OK).json({message:'success',data})

        }catch(err){
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:'Sorry, our server is down it will be fixed soon'})
        }
    }
    async getDrivers (req:Request,res:Response){
        try{
            const data = await this.driverusecase.getDrivers()
            return res.status(STATUS_CODES.OK).json({message:'success',data})

        }catch(err){
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:'Sorry, our server is down it will be fixed soon'})
        }
    }
    async updateDriver(req:Request,res:Response){
        try{
            const {id,name,age,gender,image,changed,mobile,exp,driverBata,vehicles} = req.body

            let imageUrl = image

            if(changed){
                await removeImage(image)

                imageUrl = await uploadImageToCloudinary(image)
            }

            const driver:IdriverAuth = {
                driverName:name,
                age:age,
                gender:gender,
                image:imageUrl,
                exp:exp,
                mobile:mobile,
                driverBata:driverBata,
                vehicles:vehicles
            }

            const data = await this.driverusecase.updateDriver(id,driver)

            if(data){
                return res.status(STATUS_CODES.OK).json({message:'success',data})
            }
            return res.status(STATUS_CODES.FORBIDDEN).json({message:'Your profile is not updated, occurs some error'})



        }catch(err){
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:'Sorry, our server is down it will be fixed soon'})
        }
    }

    async deleteDriver(req:Request,res:Response){
        try{
            const id = req.params.id
            const driver = await this.driverusecase.findDriverById(id)
            if(driver){
                const data = await this.driverusecase.deleteDriver(id)
                return res.status(STATUS_CODES.OK).json({message:'success',data})
            }

            return res.status(STATUS_CODES.FORBIDDEN).json({message:"Sorry , the driver you are trying to delete not found "})
        }catch(err){
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:"Sorry, our server is down it will be fixed soon"})
        }
    }

    async blockDriver(req:Request,res:Response){
        try{
            const id = req.params.id
            const driver = await this.driverusecase.findDriverById(id)
            if(driver){
                const data = await this.driverusecase.blockDriver(id)
                return res.status(STATUS_CODES.OK).json({message:"success",data})
            }

            return res.status(STATUS_CODES.FORBIDDEN).json({message:"sorry, the driver you are trying to find does not exist"})
        }catch(err){
            return res.status(STATUS_CODES.OK).json({message:"Sorry, our server is down it will be fixed soon"})
        }
    }
} 