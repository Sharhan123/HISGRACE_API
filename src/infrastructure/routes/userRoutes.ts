import express from 'express'
import { uController } from '../../providers/controllers'


const userRouter = express.Router()

userRouter.post('/register',(req,res)=>uController.userRegister(req,res))
userRouter.post('/verifyOtp',(req,res)=>uController.verifyOtp(req,res))
userRouter.get('/resendOtp',(req,res)=>uController.resendOtp(req,res))
userRouter.post('/verifylogin',(req,res)=>uController.userSignin(req,res))
userRouter.get('/verifyBlocked/:id',(req,res)=>{uController.checkUserBlocked(req,res)})
userRouter.post('/forgetPassword',(req,res)=>{uController.forgetPassword(req,res)})
userRouter.post('/forgetVerify',(req,res)=>uController.verifyForgetOtp(req,res))
userRouter.post('/resetPassword',(req,res)=>uController.resetPassword(req,res))
userRouter.post('/updateImage',(req,res)=>uController.updateImage(req,res))
userRouter.get('/getUser',(req,res)=>uController.getUserData(req,res))
userRouter.post('/updateProfile',(req,res)=>uController.updateUser(req,res))
userRouter.post('/getBookingSession',(req,res)=>uController.bookingSession(req,res))
userRouter.post('/webhook',(req,res)=>uController.webhookRouter(req,res))
export default userRouter 