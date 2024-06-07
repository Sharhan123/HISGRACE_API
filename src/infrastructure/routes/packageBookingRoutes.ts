import express from "express"
import { pbController } from "../../providers/controllers"

const packageBookingRouter = express.Router()

packageBookingRouter.post('/savePackageBooking',(req,res)=>pbController.saveBooking(req,res))
packageBookingRouter.get('/getPackageBookings',(req,res)=>pbController.getBookings(req,res))
packageBookingRouter.get('/getPackageBookingsByuser',(req,res)=>pbController.getBookingByUser(req,res))
packageBookingRouter.post('/packageBookingStatus',(req,res)=>pbController.bookingStatus(req,res))
export default packageBookingRouter  