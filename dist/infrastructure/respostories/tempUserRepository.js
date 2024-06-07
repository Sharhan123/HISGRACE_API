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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tempUserRepository = void 0;
const tempUserModel_1 = require("../../entities_models/tempUserModel");
class tempUserRepository {
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new tempUserModel_1.tempUserModel(user).save();
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tempUserModel_1.tempUserModel.findOne({ email: email });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tempUserModel_1.tempUserModel.findById(id);
        });
    }
    unsetOtp(id, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tempUserModel_1.tempUserModel.findByIdAndUpdate({ _id: id, email }, { $unset: { otp: 1 } }, { new: true } // This option returns the modified document
            );
        });
    }
    resendSave(id, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield tempUserModel_1.tempUserModel.findByIdAndUpdate(id, { $set: { otp: otp } });
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
}
exports.tempUserRepository = tempUserRepository;
