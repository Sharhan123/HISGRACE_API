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
exports.packageBookingController = void 0;
const httpStatusCodes_1 = require("../constants/httpStatusCodes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class packageBookingController {
    constructor(packageBookingUsecase) {
        this.packageBookingUsecase = packageBookingUsecase;
    }
    saveBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const token = req.headers.authorization;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token === null || token === void 0 ? void 0 : token.slice(7), process.env.JWT_SECRET);
                    const resData = Object.assign(Object.assign({}, data), { userId: decoded.id });
                    console.log(resData, 'package is booking');
                    const saved = yield this.packageBookingUsecase.saveBooking(resData);
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: "success", data: saved });
                }
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    getBookings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.packageBookingUsecase.findAll();
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: "success", data });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    getBookingByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token === null || token === void 0 ? void 0 : token.slice(7), process.env.JWT_SECRET);
                    const data = yield this.packageBookingUsecase.findByUser(decoded.id);
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', data });
                }
                return res.status(httpStatusCodes_1.STATUS_CODES.UNAUTHORIZED).json({ message: 'Please try login again and try again ' });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'sorry we are facing some issues with our server' });
            }
        });
    }
    bookingStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, status } = req.body;
                const data = yield this.packageBookingUsecase.bookingStatus(id, status);
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: "success", data });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'sorry we are facing some issues with our server' });
            }
        });
    }
}
exports.packageBookingController = packageBookingController;
