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
exports.userUseCase = void 0;
const httpStatusCodes_1 = require("../constants/httpStatusCodes");
const constants_1 = require("../constants/constants");
class userUseCase {
    constructor(userRepository, tempUserRepository, JWTTOKEN, mailer, encrypt) {
        this.userRepository = userRepository;
        this.tempUserRepository = tempUserRepository;
        this.JWTTOKEN = JWTTOKEN;
        this.mailer = mailer;
        this.encrypt = encrypt;
    }
    isEmailExist(email, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findByEmail(email, id);
        });
    }
    saveUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.saveUser(userData);
            const accessToken = this.JWTTOKEN.generateAccessToken(user._id, constants_1.ROLES.USER);
            const refreshToken = this.JWTTOKEN.generateRefreshToken(user._id, user.name, user.email, constants_1.ROLES.USER);
            return {
                status: httpStatusCodes_1.STATUS_CODES.OK,
                message: 'Success',
                data: user,
                role: '',
                accessToken: accessToken,
                refreshToken: refreshToken
            };
        });
    }
    saveTempUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.tempUserRepository.saveUser(userData);
            const userAuth = this.JWTTOKEN.generateTempToken(user._id);
            return Object.assign(Object.assign({}, JSON.parse(JSON.stringify(user))), { userAuth });
        });
    }
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.findById(userId);
            }
            catch (err) {
                throw err;
            }
        });
    }
    sendTimeoutOTP(id, email, OTP, name) {
        try {
            this.mailer.sendOTP(email, OTP, name);
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield this.tempUserRepository.unsetOtp(id, email);
            }), 60000);
        }
        catch (error) {
            console.log(error);
            throw Error('Error while sending timeout otp');
        }
    }
    forgetTimeout(email, otp, name) {
        this.mailer.sendOTP(email, otp, name);
        this.userRepository.setotp(email, otp);
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.unsetOtp(email);
        }), 60000);
    }
    resendOtp(id, email, otp, name) {
        this.tempUserRepository.resendSave(id, otp);
        this.mailer.sendOTP(email, otp, name);
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            yield this.tempUserRepository.unsetOtp(id, email);
        }), 60000);
    }
    findTempUserByID(id) {
        return this.tempUserRepository.findById(id);
    }
    verifyLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = undefined;
            const userData = yield this.userRepository.findByEmail(email, id);
            if (userData !== null) {
                if (userData.isBlocked) {
                    return {
                        status: httpStatusCodes_1.STATUS_CODES.FORBIDDEN,
                        message: 'Sorry, you are not allowed to login admin blocked your account',
                        role: 'email',
                        data: null,
                        accessToken: '',
                        refreshToken: ''
                    };
                }
                else {
                    const passwordMatch = yield this.encrypt.compare(password, userData.password);
                    if (passwordMatch) {
                        const accessToken = this.JWTTOKEN.generateAccessToken(userData._id, constants_1.ROLES.USER);
                        let refreshToken;
                        if (userData.profile) {
                            refreshToken = this.JWTTOKEN.generateRefreshTokenImage(userData._id, userData.name, userData.email, userData.profile, constants_1.ROLES.USER);
                        }
                        else {
                            refreshToken = this.JWTTOKEN.generateRefreshToken(userData._id, userData.name, userData.email, constants_1.ROLES.USER);
                        }
                        return {
                            status: httpStatusCodes_1.STATUS_CODES.OK,
                            message: 'Success',
                            role: '',
                            data: userData,
                            accessToken,
                            refreshToken
                        };
                    }
                    else {
                        return {
                            status: httpStatusCodes_1.STATUS_CODES.UNAUTHORIZED,
                            message: 'Entered password is incorrect',
                            role: 'password',
                            data: null,
                            accessToken: '',
                            refreshToken: ''
                        };
                    }
                }
            }
            return {
                status: httpStatusCodes_1.STATUS_CODES.UNAUTHORIZED,
                message: 'The user does not exist please register ',
                role: 'email',
                data: null,
                accessToken: '',
                refreshToken: ''
            };
        });
    }
    resetPassword(email, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.updatePassword(pass, email);
        });
    }
    ProfileImage(image, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.updateImage(image, id);
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.updateUserDetails(id, user);
        });
    }
    updateLastseen(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.updateLastSeen(id);
        });
    }
    updateAddress(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.updateAddress(id, data);
        });
    }
    updateCount(id, count) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.updateCount(id, count);
        });
    }
    updateNewMessage(id, count) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.updateNewMessage(id, count);
        });
    }
}
exports.userUseCase = userUseCase;
