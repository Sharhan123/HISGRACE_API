import { Request, Response } from "express";
import { packageUseCase } from "../useCases/packagesUseCase";
import { STATUS_CODES } from "../constants/httpStatusCodes";
import { IvehicleAuth } from "../interfaces/schema/vehicleSchema";
import { IpackageAuth } from "../interfaces/schema/packageSchema";
import { uploadImageToCloudinary } from "../providers/cloudinart";

export class packageController {
    constructor(
        private readonly packageUseCase: packageUseCase
    ) { }

    async addPackage(req: Request, res: Response) {
        try {
            const { title, car, location, days, perDay, desc, total, image } = req.body
            const data: IpackageAuth = {
                title: title,
                vehicle: car,
                days: days,
                location: location,
                perDay: perDay,
                desc: desc,
                total: total,
                image: image
            }

            const saved = await this.packageUseCase.addPackage(data)
            return res.status(STATUS_CODES.OK).json({ message: 'success', saved })
        } catch (err) {
            console.log(err)
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: err })
        }
    }

    async getPackages(req: Request, res: Response) {
        try {
            const data = await this.packageUseCase.getPackages()
            return res.status(STATUS_CODES.OK).json({ message: 'success', data })

        } catch (err) {
            console.log(err);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: err })

        }
    }

    async editPackage(req: Request, res: Response) {
        try {
            const { _id, car, title, days, desc, perDay, total, image, location, changed } = req.body
            let imageUrl = image
            if (changed) {

                imageUrl = await uploadImageToCloudinary(image)
            }
            const data = {
                id: _id,
                vehicle: car,
                title: title,
                days: days,
                desc: desc,
                perDay: perDay,
                total: total,
                location: location,
                image: imageUrl
            }
            const response = await this.packageUseCase.editPackage(data)
            if (response) {
                return res.status(STATUS_CODES.OK).json({ message: 'success', data: response })
            }
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'The package was not found' })

        } catch (err) {
            console.log(err);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: err })

        }
    }

    async deletePackage(req: Request, res: Response) {
        try {
            const id = req.params.id
            if(id){
                const response = await this.packageUseCase.deletePackage(id)

                return res.status(STATUS_CODES.OK).json({message:'success',data:response})
            }
            return res.status(STATUS_CODES.UNAUTHORIZED).json({message:'Package id not found as params'})
        } catch (err) {
            console.log(err);
            return res.status(STATUS_CODES.FORBIDDEN).json({ message: err })

        }
    } 

    async blockAndUnblock(req:Request,res:Response){
        try{
            const id = req.params.id
            const isExist = await this.packageUseCase.packageExist(id)
            if(isExist){
                const data = await this.packageUseCase.blockAndUnblock(id)
                return res.status(STATUS_CODES.OK).json({message:'success',data})
            }

            return res.status(STATUS_CODES.FORBIDDEN).json({message:'The package you trying to block is not exist'})
        }catch(err){
            console.log(err);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message:err})
            
        }
    }

} 