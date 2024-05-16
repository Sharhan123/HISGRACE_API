import { Request, Response } from "express";
import { STATUS_CODES } from "../constants/httpStatusCodes";
import { driverUseCase } from "../useCases/driverUseCase";
import { removeImage, uploadImageToCloudinary } from "../providers/cloudinart";
import { IdriverAuth } from "../interfaces/schema/driverSchema";
import { IvehicleAuth } from "../interfaces/schema/vehicleSchema";
import { JWTTOKEN } from "../providers/jwt";
import { ROLES } from "../constants/constants";

export class driverController {
    constructor(
        private readonly driverusecase : driverUseCase,
        private readonly jwt:JWTTOKEN
    ){}

    async addDriver(req:Request,res:Response){
        try{
            const {name,email,password,vehicles,age,gender,mobile,exp,driverBata,image} = req.body

            const driver = await this.driverusecase.isExist(email)

            if(driver){
                return res.status(STATUS_CODES.CONFLICT).json({message:'Email address already exist , driver already Registered ',role:'email'})
            }


            const imageUrl = await uploadImageToCloudinary(image)
            const OTP = Math.floor(1000 + Math.random() * 9000);
            const driverData:IdriverAuth = {
                driverName:name,
                age:age,
                email:email,
                gender:gender,
                vehicles:vehicles,
                mobile:mobile,
                password:password,
                exp:exp,
                driverBata:driverBata,
                image:imageUrl,
                status:OTP
            }
            
            const data = await this.driverusecase.saveDriver(driverData)
            console.log(data,'saved Data.......');
            this.driverusecase.sendTimeoutOTP(email,OTP,name)

            return res.status(STATUS_CODES.OK).json({message:'success',data})

        }catch(err){
            console.log(err);
            
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:'Sorry, our server is down it will be fixed soon'})
        }
    }
    async verifyOtp(req:Request,res:Response){
        try{
            
            const {email,otp} = req.body
            const data = await this.driverusecase.isExist(email)
            console.log(email,otp,'entered.............') ;
            if(data){
                if(data.status === otp){
                    const refreshToken =  this.jwt.generateRefreshToken(data._id,data.driverName,data.email,ROLES.DRIVER)
                    await this.driverusecase.updateVerification(email)
                    return res.status(STATUS_CODES.OK).json({message:'success',token:refreshToken})
                }else{
                    return res.status(STATUS_CODES.BAD_REQUEST).json({message:"Entered otp is incorrect"})
                }
            }else{
                console.log('no data');
                
            }
        }catch(err){
            console.log(err);
            
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:'Sorry, our server is down it will be fixed soon'})
        }
    }
    async findDriver(req:Request,res:Response){
        try{
            const id = req.params.id
            const data = await this.driverusecase.findDriverById(id)
            return res.status(STATUS_CODES.OK).json({messages:'success',data})
        }catch(err){
            console.log(err);
            
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
            const {id,name,email,age,gender,image,changed,mobile,exp,driverBata,vehicles} = req.body

            let imageUrl = image

            if(changed){
                await removeImage(image)

                imageUrl = await uploadImageToCloudinary(image)
            }

            const driver:IdriverAuth = {
                driverName:name,
                age:age,
                email:email,
                gender:gender,
                image:imageUrl, 
                password:'',
                exp:exp,
                mobile:mobile,
                driverBata:driverBata,
                vehicles:vehicles,
                status:''
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

    async updateRequest(req:Request,res:Response){
        try{
            const {id,status} = req.body

            const driver = await this.driverusecase.findDriverById(id)
            if(driver){
                    await this.driverusecase.updateRequest(id,status)
                    await this.driverusecase.sentRequestMail(driver.email.toString(),status,driver.driverName.toString())
                    return res.status(STATUS_CODES.OK).json({message:'success'})
            }
            return res.status(STATUS_CODES.UNAUTHORIZED).json({message:'driver does not found'})
        }catch(err){
            console.log(err);
            
        }
    }
    async removeDriver(req:Request,res:Response){
        try{
            const id = req.params.id
            const data = await this.driverusecase.removeById(id)
            return res.status(STATUS_CODES.OK).json({message:'success',data})
        }catch(err){
            console.log(err);
            
        }
    }
    async resendOtp(req:Request,res:Response){
        try{
            const {email} = req.body
             
            const OTP = Math.floor(1000 + Math.random() * 9000);
            this.driverusecase.sendTimeoutOTP(email,OTP,'Driver Hisgrace')
            return res.status(STATUS_CODES.OK).json({message:'success'})
        }catch(err){
            console.log(err);   
        }
    }
    async driverLogin(req:Request,res:Response){
        try{
            const {email,password} = req.body
            const driver = await this.driverusecase.isExist(email)
            if(driver){
                if(driver.password === password){
                    const refreshToken =  this.jwt.generateRefreshToken(driver._id,driver.driverName,driver.email,ROLES.DRIVER)
                    return res.status(STATUS_CODES.OK).json({message:"success",token:refreshToken})
                }else{
                    return res.status(STATUS_CODES.FORBIDDEN).json({message:"entered password is incorrect"})
                }
            }
            return res.status(STATUS_CODES.FORBIDDEN).json({message:"User on this email address not exist "})
        }catch(err){
            console.log(err);
            
        }
    }
} 