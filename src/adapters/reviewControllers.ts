import { Request, Response } from "express";
import { ReviewUsecase } from "../useCases/reviewUsecase";
import {STATUS_CODES} from '../constants/httpStatusCodes'
import jwt,{ JwtPayload } from "jsonwebtoken";
export class reviewController{
    constructor(
        private readonly reviewUsecase:ReviewUsecase
    ){}

    async saveReview(req:Request,res:Response){
        try{
            const review = req.body
            const token = req.headers.authorization;
            if (token) {
                const decoded = jwt.verify(token?.slice(7), process.env.JWT_SECRET as string) as JwtPayload
                const reviewData = {
                    ...review,
                    user:decoded.id
                }
                const data = await this.reviewUsecase.saveReview(reviewData)
                return res.status(STATUS_CODES.OK).json({message:"success",data:data})
            }
            return res.status(STATUS_CODES.UNAUTHORIZED).json({message:"Unauthorized try please login and try again"})
        }catch(err){
            console.log(err);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:"sorryy we are facing a server issue we will be fixing it soon"})
        }
    }

    async getReviews(req:Request,res:Response){
        try{
            const data = await this.reviewUsecase.findAll()
            return res.status(STATUS_CODES.OK).json({message:"success",data})
        }catch(err){
            console.log(err);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:"sorry we are facing a server issue we will be fixing it soon"})
            
        }
    }
}