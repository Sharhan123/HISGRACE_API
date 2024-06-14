import express from "express";
import { rController } from "../../providers/controllers";

const reviewRouter = express.Router()

reviewRouter.post('/saveReview',(req,res)=>rController.saveReview(req,res))
reviewRouter.get('/getReviews',(req,res)=>rController.getReviews(req,res))


export default reviewRouter