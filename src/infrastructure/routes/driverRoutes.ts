import express, { Request, Response } from 'express'
import { dController, vController } from '../../providers/controllers'
import { authMiddleware } from '../../middlewares/authMiddleware'

const driverRouter = express.Router()

driverRouter.post('/addDriver',(req:Request,res:Response)=>dController.addDriver(req,res))
driverRouter.get('/getAllDrivers',(req,res)=>dController.getDrivers(req,res)) 
driverRouter.delete('/deleteDriver/:id',(req,res)=>dController.deleteDriver(req,res))
driverRouter.post('/updateDriver',(req,res)=>dController.updateDriver(req,res))
driverRouter.get('/blockDriver/:id',(req,res)=>dController.blockDriver(req,res))
driverRouter.post('/verifyOtp',(req,res)=>dController.verifyOtp(req,res))
driverRouter.get('/findDriver/:id',(req,res)=>dController.findDriver(req,res))
driverRouter.post('/updateRequest',(req,res)=>dController.updateRequest(req,res))
driverRouter.get('/removeDriver/:id',(req,res)=>dController.removeDriver(req,res))
driverRouter.post('/resendOtp',(req,res)=>dController.resendOtp(req,res))
driverRouter.post('/driverLogin',(req,res)=>dController.driverLogin(req,res))
export default driverRouter 