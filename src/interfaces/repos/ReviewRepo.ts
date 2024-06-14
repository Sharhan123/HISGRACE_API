import { Ireview, IreviewRes } from "../schema/reviewSchema"

export interface IReviewRepo {
    saveReview(review:Ireview):Promise<IreviewRes>
    findAll():Promise<IreviewRes[]>
}