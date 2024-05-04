import { Request, Response } from "express";
import { vehicleUseCase } from "../useCases/vehicleUseCase";
import multer from "multer"
import { uploadImageToCloudinary } from "../providers/cloudinart";
import { Ivehicle, IvehicleAuth } from "../interfaces/schema/vehicleSchema";
import { STATUS_CODES } from "../constants/httpStatusCodes";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export class vehicleController {
    constructor(
        private readonly vehicleUseCase : vehicleUseCase
    ){}


    uploadImage = upload.array('image',10) 

    async addVehicle(req:Request, res:Response){
        try{
            const {name,type,fuel,seat,desc,sprice,price,image} = req.body
            const imageUrl = await uploadImageToCloudinary(image)
            const data:IvehicleAuth = {
                id:Math.random(),
                vehicleName : name,
                type:type,
                fuel:fuel,
                seat:seat,
                desc:desc,
                startingPrice:sprice,
                price:price,
                images:imageUrl
            }

            const response = await this.vehicleUseCase.addVehicle(data)
            
           return res.status(STATUS_CODES.OK).json({message:'success'})

        }catch(err){
            console.log(err);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:err}) 
            
        }
    }
    async getAllVehicles(req:Request,res:Response){
        try{

            const data = await this.vehicleUseCase.getAllvehicles()
            const vehicles:String[] = []
            data.forEach(e => {
                vehicles.push(e.vehicleName)
            });
            return res.status(STATUS_CODES.OK).json({data:data,vehicles})

        }catch(err){
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:err})
        }
    }
    async deleteVehicle(req:Request,res:Response){
        try{
            const id = req.params.id
            const vehicle = await this.vehicleUseCase.vehicleExist(id)
            if(vehicle){
                this.vehicleUseCase.deleteVehicle(id)
                return res.status(STATUS_CODES.OK).json({message:'success'})
            }else{
                return res.status(STATUS_CODES.FORBIDDEN).json({message:'Vehicle not found'})
            }
        }catch(err){
            console.log(err);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:'Internal server error'})
            
        }
    }

    async updateVehicle(req:Request,res:Response){
        try{
            const {id,name,type,fuel,seat,sprice,price,desc,image,changed} = req.body
            let imageUrl = image
            if(changed){
                imageUrl = await uploadImageToCloudinary(image)

            }
            const data = {
                id:id,
                vehicleName:name,
                type:type,
                seat:seat,
                fuel:fuel,
                desc:desc,
                images:imageUrl,
                price:price,
                startingPrice:sprice
            }

            const response = await this.vehicleUseCase.updateVehicle(data)
            return res.status(STATUS_CODES.OK).json({message:'success',response})
        }catch(err){
            console.log(err);
           

                return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:err})
            
            
        }
    }

    async blockAndUnblock(req:Request,res:Response){
        try{
            const id = req.params.id
            const isExist = await this.vehicleUseCase.findVehicle(id)
            if(isExist){

                const data = await this.vehicleUseCase.blockAndUnblock(id)
                return res.status(STATUS_CODES.OK).json({message:'success',data})
            } 

            return res.status(STATUS_CODES.FORBIDDEN).json({message:'The vehicle you trying to block is not exist'})

        }catch(err){
            console.log(err);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:err})
            
        }
    }
} 

