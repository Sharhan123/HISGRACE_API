import  express from 'express'
import { aConntroller } from '../../providers/controllers'
import { authMiddleware } from '../../middlewares/authMiddleware'
import { adminRole } from '../../middlewares/adminMiddleWares/adminRole'
const adminRouter = express.Router()

adminRouter.post('/signin',(req,res)=>aConntroller.adminSigin(req,res))
adminRouter.get('/getUsers',(req,res)=>aConntroller.getAllUsers(req,res))
adminRouter.get('/blockUser/:id',(req,res)=>aConntroller.blockUser(req,res))
export default adminRouter