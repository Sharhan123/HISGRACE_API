import { Request, Response } from "express";
import { STATUS_CODES } from "../constants/httpStatusCodes";
import { chatUsecase } from "../useCases/chatUseCase";
import jwt, { JwtPayload } from "jsonwebtoken"
import { uploadAudioToCloudinary, uploadImageToCloudinary } from "../providers/cloudinart";
export class chatController {
    constructor(
        private readonly chatUsecase: chatUsecase
    ) { }

    async saveChat(req: Request, res: Response) {
        try {
            const token = req.headers.authorization;
            if (token) {
                const decoded = jwt.verify(token?.slice(7), process.env.JWT_SECRET as string) as JwtPayload
                const id = decoded.id
                const content = req.body;

                if(content){
                    if(content.contentType === 'voice'){
                        const link = await uploadImageToCloudinary(content.content)
                        content.content = link
                    }
                    const data = await this.chatUsecase.saveChats(content) 
                    return res.status(STATUS_CODES.OK).json({message:'success',data})
                }else{
                    return res.status(STATUS_CODES.BAD_REQUEST).json({message:"Please provide a message content to save"})
                }

            }else{
                return res.status(STATUS_CODES.UNAUTHORIZED).json({message:"Your request is unauthorized please login to chat"})
            }
        } catch (err) {
            console.log(err);

            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "sorry, we are facing some internal server issues we will fix it soon" })
        }

    }
    async findChats(req:Request,res:Response){
        try{
            
            const id = req.params.id
                const data = await this.chatUsecase.findChats(id)
                return res.status(STATUS_CODES.OK).json({message:"Success",data})
           
        }catch(err){
            console.log(err);
            
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "sorry, we are facing some internal server issues we will fix it soon" })
 
        }
    }
}