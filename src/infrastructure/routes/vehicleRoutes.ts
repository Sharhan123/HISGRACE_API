import express, { Request, Response } from 'express'
import { vController } from '../../providers/controllers'
import { authMiddleware } from '../../middlewares/authMiddleware'

const vehicleRouter = express.Router()

vehicleRouter.post('/addVehicle',(req:Request,res:Response)=>vController.addVehicle(req,res))
vehicleRouter.get('/getAllVehices',(req,res)=>vController.getAllVehicles(req,res)) 
vehicleRouter.delete('/deleteVehicle/:id',(req,res)=>vController.deleteVehicle(req,res))
vehicleRouter.post('/updateVehicle',(req,res)=>vController.updateVehicle(req,res))
vehicleRouter.get('/blockVehicle/:id',(req,res)=>vController.blockAndUnblock(req,res))
export default vehicleRouter 