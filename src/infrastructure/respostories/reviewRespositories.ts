import ReviewModel from "../../entities_models/ratngReviewModal";
import { IReviewRepo } from "../../interfaces/repos/ReviewRepo";
import { Ireview, IreviewRes} from "../../interfaces/schema/reviewSchema"
export class ReviewRepository implements IReviewRepo{
    async saveReview(review: Ireview): Promise<IreviewRes> {
        try{
            return await new ReviewModel(review).save()
        }catch(err){
            throw err
        }
    }
     async findAll(): Promise<IreviewRes[]> {
        try{
            return await ReviewModel.find({}).populate('user').populate('vehicleId').populate('driverId')
        }catch(err){
            throw err
        }   
    }
}