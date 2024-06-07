import { Request, Response } from "express";
import { STATUS_CODES } from '../constants/httpStatusCodes'
import { adminUseCase } from "../useCases/adminUseCase";
import { JWTTOKEN } from "../providers/jwt";
import { ROLES } from "../constants/constants";
import mongoose from "mongoose";
import { bookingusecase } from "../useCases/bookingUseCase";
import jwt, { JwtPayload } from "jsonwebtoken"
import { vehicleUseCase } from "../useCases/vehicleUseCase";
import { IvehicleRes } from "../interfaces/schema/vehicleSchema";
import { packageBookingUsecase } from "../useCases/packageBooking";
export class packageBookingController {
    constructor(
        private readonly packageBookingUsecase:packageBookingUsecase,
    ) { }
    async saveBooking(req: Request, res: Response) {
        try {
            const data = req.body
            const token = req.headers.authorization;
            if (token) {


                const decoded = jwt.verify(token?.slice(7), process.env.JWT_SECRET as string) as JwtPayload

                const resData = {
                    ...data,
                    userId: decoded.id,
                }
                console.log(resData,'package is booking');
                


                

                const saved: any = await this.packageBookingUsecase.saveBooking(resData)

                return res.status(STATUS_CODES.OK).json({message:"success",data:saved})
            }

        } catch (err) {
            console.log(err)
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' })
        }
    }

    
    async getBookings(req: Request, res: Response) {
        try {
            const data = await this.packageBookingUsecase.findAll()
            return res.status(STATUS_CODES.OK).json({ message: "success", data })
        } catch (err) {
            console.log(err);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' })
        }
    }
    async getBookingByUser(req: Request, res: Response) {
        try {
            const token = req.headers.authorization;
            if (token) {
                const decoded = jwt.verify(token?.slice(7), process.env.JWT_SECRET as string) as JwtPayload

                const data = await this.packageBookingUsecase.findByUser(decoded.id)
                return res.status(STATUS_CODES.OK).json({message:'success',data})
            }
            return res.status(STATUS_CODES.UNAUTHORIZED).json({message:'Please try login again and try again '})
        } catch (err) {
            console.log(err);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'sorry we are facing some issues with our server' })
        }
    }
    async bookingStatus(req:Request,res:Response){
        try{
            const {id,status} = req.body

            const data = await this.packageBookingUsecase.bookingStatus(id,status)
            return res.status(STATUS_CODES.OK).json({message:"success",data})
        }catch(err){
            console.log(err);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'sorry we are facing some issues with our server' })
        }
    }
}



