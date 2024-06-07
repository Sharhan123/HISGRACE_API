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
exports.chatController = void 0;
const httpStatusCodes_1 = require("../constants/httpStatusCodes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinart_1 = require("../providers/cloudinart");
class chatController {
    constructor(chatUsecase) {
        this.chatUsecase = chatUsecase;
    }
    saveChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token === null || token === void 0 ? void 0 : token.slice(7), process.env.JWT_SECRET);
                    const id = decoded.id;
                    const content = req.body;
                    if (content) {
                        if (content.contentType === 'voice') {
                            const link = yield (0, cloudinart_1.uploadImageToCloudinary)(content.content);
                            content.content = link;
                        }
                        const data = yield this.chatUsecase.saveChats(content);
                        return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', data });
                    }
                    else {
                        return res.status(httpStatusCodes_1.STATUS_CODES.BAD_REQUEST).json({ message: "Please provide a message content to save" });
                    }
                }
                else {
                    return res.status(httpStatusCodes_1.STATUS_CODES.UNAUTHORIZED).json({ message: "Your request is unauthorized please login to chat" });
                }
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "sorry, we are facing some internal server issues we will fix it soon" });
            }
        });
    }
    findChats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const data = yield this.chatUsecase.findChats(id);
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: "Success", data });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "sorry, we are facing some internal server issues we will fix it soon" });
            }
        });
    }
}
exports.chatController = chatController;
