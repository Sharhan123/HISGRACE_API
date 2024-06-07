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
exports.chatRepository = void 0;
const chatModel_1 = __importDefault(require("../../entities_models/chatModel"));
const lastSeenUser_1 = __importDefault(require("../../entities_models/lastSeenUser"));
class chatRepository {
    saveChat(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield new chatModel_1.default(data).save();
            }
            catch (err) {
                throw err;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield chatModel_1.default.find({ $or: [{ reciever: id }, { sender: id }] });
            }
            catch (err) {
                throw err;
            }
        });
    }
    saveLast(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield new lastSeenUser_1.default(data).save();
            }
            catch (err) {
                throw err;
            }
        });
    }
    findLastById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield lastSeenUser_1.default.findOne({ userId: id });
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.chatRepository = chatRepository;
