import express from 'express'
import { pController } from '../../providers/controllers'

const packageRouter = express.Router()

packageRouter.post('/addPackage',(req,res)=>pController.addPackage(req,res))
packageRouter.get('/getPackages',(req,res)=>pController.getPackages(req,res))
packageRouter.post('/editPackage',(req,res)=>pController.editPackage(req,res))
packageRouter.delete('/deletePackage/:id',(req,res)=>pController.deletePackage(req,res))
packageRouter.get('/blockPackage/:id',(req,res)=>pController.blockAndUnblock(req,res))

export default packageRouter 