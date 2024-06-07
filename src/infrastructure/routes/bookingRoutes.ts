import  express from 'express'
import { aConntroller, bController } from '../../providers/controllers'
import { authMiddleware } from '../../middlewares/authMiddleware'
const bookingRouter = express.Router()
bookingRouter.post('/getBookingSession',(req,res)=>bController.bookingSession(req,res))
bookingRouter.post('/webhook',(req,res)=>bController.webhookRouter(req,res))
bookingRouter.get('/getBookings',(req,res)=>bController.getBookings(req,res))
bookingRouter.get('/getBookingsByuser',(req,res)=>bController.getBookingByUser(req,res))
bookingRouter.post('/bookingStatus',(req,res)=>bController.bookingStatus(req,res))
export default bookingRouter 