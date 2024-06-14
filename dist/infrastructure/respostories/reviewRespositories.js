"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRepository = void 0;
const ratngReviewModal_1 = __importDefault(require("../../entities_models/ratngReviewModal"));
class ReviewRepository {
    saveReview(review) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield new ratngReviewModal_1.default(review).save();
            }
            catch (err) {
                throw err;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ratngReviewModal_1.default.find({}).populate('user').populate('vehicleId').populate('driverId');
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.ReviewRepository = ReviewRepository;
