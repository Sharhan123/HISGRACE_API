import express, { Request, Response } from 'express'
import { dController, vController } from '../../providers/controllers'
import { authMiddleware } from '../../middlewares/authMiddleware'

const driverRouter = express.Router()

driverRouter.post('/addDriver',(req:Request,res:Response)=>dController.addDriver(req,res))
driverRouter.get('/getAllDrivers',(req,res)=>dController.getDrivers(req,res)) 
driverRouter.delete('/deleteDriver/:id',(req,res)=>dController.deleteDriver(req,res))
driverRouter.post('/updateDriver',(req,res)=>dController.updateDriver(req,res))
driverRouter.get('/blockDriver/:id',(req,res)=>dController.blockDriver(req,res))
export default driverRouter 