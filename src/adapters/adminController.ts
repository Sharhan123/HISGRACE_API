import { Request, Response } from "express";
import { STATUS_CODES } from '../constants/httpStatusCodes'
import { adminUseCase } from "../useCases/adminUseCase";
import { JWTTOKEN } from "../providers/jwt";
import { ROLES } from "../constants/constants";
import mongoose from "mongoose";
export class adminController {
    constructor(
        private readonly adminUseCase:adminUseCase,
        private readonly jwtToken:JWTTOKEN
    ) { }

   
    async adminSigin(req:Request,res:Response){
        try{

            const {email,password} = req.body
            const admin = await this.adminUseCase.exist(email)
            console.log(admin +'.........');
            
            if(admin){
                if(admin.password === password){
                    const token =  this.jwtToken.generateAdminToken(admin.email,ROLES.ADMIN)
                    return res.status(STATUS_CODES.OK).json({message:"success",token})
                }
                return res.status(STATUS_CODES.FORBIDDEN).json({password:"Entered password is incorrect"})
            }
            return res.status(STATUS_CODES.FORBIDDEN).json({email:"Entered email address is incorrect"})

        }catch(err){
            console.log(err);
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:"sorry unfortunately our server is down please try again later"})  
        }
    }
    async getAllUsers(req:Request,res:Response){
        try{
            const users = await this.adminUseCase.getAllUsers()
            
            
            return res.status(STATUS_CODES.OK).json({users,success:true})
        }catch(err){
           console.log(err);
           res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:"sorry unfortunately our server is down please try again later"})  

        }
    }
    async blockUser(req:Request,res:Response){
        try{
            const id = req.params.id
            if(id){
                const resp = await this.adminUseCase.blockUser(id)
                console.log(resp +'..');
                const blocked = resp?.isBlocked
                return res.status(STATUS_CODES.OK).json({success:true,blocked })
            }

        }catch(err){
            console.log(err);
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:"sorry unfortunately our server is down please try again later"})  

        }
    }  
}



