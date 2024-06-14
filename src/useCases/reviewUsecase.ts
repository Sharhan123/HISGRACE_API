import { ReviewRepository } from "../infrastructure/respostories/reviewRespositories";
import { Ireview, IreviewRes } from "../interfaces/schema/reviewSchema";

export class ReviewUsecase {
    constructor(
        private readonly ReviewRepository:ReviewRepository
    ){}

    async saveReview(review:Ireview):Promise<IreviewRes>{
        return await this.ReviewRepository.saveReview(review)
    }
    async findAll():Promise<IreviewRes[]>{
        return await this.ReviewRepository.findAll()
    }
}