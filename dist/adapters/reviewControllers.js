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
exports.reviewController = void 0;
const httpStatusCodes_1 = require("../constants/httpStatusCodes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class reviewController {
    constructor(reviewUsecase) {
        this.reviewUsecase = reviewUsecase;
    }
    saveReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = req.body;
                const token = req.headers.authorization;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token === null || token === void 0 ? void 0 : token.slice(7), process.env.JWT_SECRET);
                    const reviewData = Object.assign(Object.assign({}, review), { user: decoded.id });
                    const data = yield this.reviewUsecase.saveReview(reviewData);
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: "success", data: data });
                }
                return res.status(httpStatusCodes_1.STATUS_CODES.UNAUTHORIZED).json({ message: "Unauthorized try please login and try again" });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "sorryy we are facing a server issue we will be fixing it soon" });
            }
        });
    }
    getReviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.reviewUsecase.findAll();
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: "success", data });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "sorry we are facing a server issue we will be fixing it soon" });
            }
        });
    }
}
exports.reviewController = reviewController;
