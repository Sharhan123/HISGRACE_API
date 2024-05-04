import { Request, Response } from "express";
import { STATUS_CODES } from '../constants/httpStatusCodes'
import { adminUseCase } from "../useCases/adminUseCase";
import { JWTTOKEN } from "../providers/jwt";
import { ROLES } from "../constants/constants";
import mongoose from "mongoose";
import { bookingusecase } from "../useCases/bookingUseCase";
import jwt, { JwtPayload } from "jsonwebtoken"
export class bookingController {
    constructor(
        private readonly bookingusecase:bookingusecase,
        
    ) { }
    async getBookings(req:Request,res:Response){
        try{
            const data = await this.bookingusecase.findAll()
            return res.status(STATUS_CODES.OK).json({message:"success",data})
        }catch(err){
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:'soryy'})
        }
    }
    async getBookingByUser(req:Request,res:Response){
        try{
            const token = req.headers.authorization;
            if (token) {
                const decoded = jwt.verify(token?.slice(7), process.env.JWT_SECRET as string) as JwtPayload

                const data = await this.bookingusecase.findByUser(decoded.id)
            }
        }catch(err){
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:'sorry we are facing some issues with our server'})

        }
    }
    
}



