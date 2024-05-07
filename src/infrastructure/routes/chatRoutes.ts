import express from "express"
import { cController } from "../../providers/controllers"

const chatRouter = express.Router()

chatRouter.post('/saveChat',async(req,res)=>cController.saveChat(req,res))
chatRouter.get('/getChats/:id',async(req,res)=>cController.findChats(req,res))
export default chatRouter