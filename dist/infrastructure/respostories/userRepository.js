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
exports.UserRepository = void 0;
const userModel_1 = __importDefault(require("../../entities_models/userModel"));
class UserRepository {
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("saving user", user);
                return yield new userModel_1.default(user).save();
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.findById(id);
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    findByEmail(email, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = userModel_1.default.findOne({ email: email });
                if (id) {
                    query = query.where('_id').ne(id);
                }
                return yield query.exec();
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    setotp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.findOneAndUpdate({ email: email }, { $set: { otp: otp } });
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    unsetOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.findOneAndUpdate({ email: email }, { $unset: { otp: 1 } });
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    updatePassword(pass, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.findOneAndUpdate({ email: email }, { $set: { password: pass } });
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    updateImage(image, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.findByIdAndUpdate(id, { $set: { profile: image } }, { new: true });
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateUserDetails(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.findByIdAndUpdate(id, {
                    $set: {
                        name: user.name,
                        email: user.email,
                        age: user.age,
                        gender: user.gender,
                        mobile: user.mobile,
                        secondaryMobile: user.secondaryMobile,
                        language: user.language
                    }
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateLastSeen(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.findByIdAndUpdate(id, { lastseen: Date.now() });
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateAddress(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.findByIdAndUpdate(id, { address: data });
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateCount(id, count) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (count === 'inc') {
                    console.log(count);
                    return yield userModel_1.default.findByIdAndUpdate(id, { $inc: { unRead: 1 } });
                }
                else {
                    console.log(count, '/.//.');
                    return yield userModel_1.default.findByIdAndUpdate(id, { unRead: 0 });
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateNewMessage(id, count) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (count === 'inc') {
                    return yield userModel_1.default.findByIdAndUpdate(id, { $inc: { newMessage: 1 } });
                }
                else {
                    return yield userModel_1.default.findByIdAndUpdate(id, { newMessage: 0 });
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.UserRepository = UserRepository;
