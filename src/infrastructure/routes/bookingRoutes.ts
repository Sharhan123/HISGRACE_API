import  express from 'express'
import { aConntroller, bController } from '../../providers/controllers'
import { authMiddleware } from '../../middlewares/authMiddleware'
import { adminRole } from '../../middlewares/adminMiddleWares/adminRole'
const bookingRouter = express.Router()

bookingRouter.get('/getBookings',(req,res)=>bController.getBookings(req,res))

export default bookingRouter 