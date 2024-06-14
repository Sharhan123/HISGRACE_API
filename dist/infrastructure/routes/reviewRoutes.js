"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../providers/controllers");
const reviewRouter = express_1.default.Router();
reviewRouter.post('/saveReview', (req, res) => controllers_1.rController.saveReview(req, res));
reviewRouter.get('/getReviews', (req, res) => controllers_1.rController.getReviews(req, res));
exports.default = reviewRouter;
