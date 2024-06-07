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
exports.userController = void 0;
const httpStatusCodes_1 = require("../constants/httpStatusCodes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinart_1 = require("../providers/cloudinart");
let mainData;
class userController {
    constructor(userUseCase, otpGenerator, encrypt, bookingusecase) {
        this.userUseCase = userUseCase;
        this.otpGenerator = otpGenerator;
        this.encrypt = encrypt;
        this.bookingusecase = bookingusecase;
    }
    userRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, cpassword } = req.body;
                console.log(req.body, 'this is body');
                const id = undefined;
                const isEmailExist = yield this.userUseCase.isEmailExist(email, id);
                console.log(process.env.EMAIL_ID);
                if (isEmailExist == null) {
                    if (password === cpassword) {
                        const otp = this.otpGenerator.generateOTP();
                        const securePass = yield this.encrypt.encrypt(password.toString());
                        const user = { name: name, email: email, password: securePass, otp: otp };
                        const tempUser = yield this.userUseCase.saveTempUser(user);
                        const emailS = tempUser.email.toString();
                        this.userUseCase.sendTimeoutOTP(tempUser._id, emailS, otp, name.toString());
                        res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'Success', token: tempUser.userAuth });
                    }
                    else {
                        res.status(httpStatusCodes_1.STATUS_CODES.FORBIDDEN).json({ message: 'Confirm password and password does not match', role: 'password' });
                    }
                }
                else {
                    res.status(httpStatusCodes_1.STATUS_CODES.FORBIDDEN).json({ message: 'Entered email address already exist please login ', role: 'email' });
                }
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('................................otp');
                const { value } = req.body;
                const token = req.headers.authorization;
                console.log(req.headers.authorization);
                if (token) {
                    console.log(token);
                    const decoded = jsonwebtoken_1.default.verify(token === null || token === void 0 ? void 0 : token.slice(7), process.env.JWT_SECRET);
                    console.log(decoded);
                    const user = yield this.userUseCase.findTempUserByID(decoded.id);
                    if (user) {
                        if (value == user.otp) {
                            const savedData = yield this.userUseCase.saveUser({
                                name: user.name,
                                email: user.email,
                                password: user.password
                            });
                            console.log(savedData);
                            return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', token: savedData.refreshToken });
                        }
                        else {
                            res.status(httpStatusCodes_1.STATUS_CODES.UNAUTHORIZED).json({ message: 'entered otp is not valid try again' });
                        }
                    }
                    else {
                        res.status(httpStatusCodes_1.STATUS_CODES.UNAUTHORIZED).json({ message: 'Otp time out register again' });
                    }
                }
                else {
                    res.status(httpStatusCodes_1.STATUS_CODES.UNAUTHORIZED).json({ message: 'Unauthorized token' });
                }
            }
            catch (err) {
                console.log(err + 'from here');
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    resendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                if (token) {
                    console.log(token);
                    const decoded = jsonwebtoken_1.default.verify(token === null || token === void 0 ? void 0 : token.slice(7), process.env.JWT_SECRET);
                    console.log(decoded);
                    const user = yield this.userUseCase.findTempUserByID(decoded.id);
                    if (user) {
                        const otp = this.otpGenerator.generateOTP();
                        this.userUseCase.resendOtp(user._id, user.email.toString(), otp, user.email.toString());
                        return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success' });
                    }
                    else {
                        res.status(httpStatusCodes_1.STATUS_CODES.UNAUTHORIZED).json({ message: 'Otp time out register again' });
                    }
                }
                else {
                    res.status(httpStatusCodes_1.STATUS_CODES.UNAUTHORIZED).json({ message: 'Unauthorized token' });
                }
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    userSignin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const authData = yield this.userUseCase.verifyLogin(email, password);
                return res.status(authData.status).json({ authData: authData });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    checkUserBlocked(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield this.userUseCase.findUserById(id);
                if ((user === null || user === void 0 ? void 0 : user.isBlocked) === true) {
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ success: true, blocked: true });
                }
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ success: false, blocked: false });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    forgetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const id = undefined;
                const user = yield this.userUseCase.isEmailExist(email, id);
                if (user) {
                    const otp = this.otpGenerator.generateOTP();
                    this.userUseCase.forgetTimeout(email, otp, 'Forget password');
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', email: email });
                }
                else {
                    return res.status(httpStatusCodes_1.STATUS_CODES.FORBIDDEN).json({ message: 'Entered email address does not exist' });
                }
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    verifyForgetOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { value, email } = req.body;
                const id = undefined;
                const user = yield this.userUseCase.isEmailExist(email, id);
                if (user) {
                    if (parseInt(value) === user.otp) {
                        return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success' });
                    }
                    else {
                        return res.status(httpStatusCodes_1.STATUS_CODES.FORBIDDEN).json({ message: 'Entered otp is invalid please try again' });
                    }
                }
                else {
                    return res.status(httpStatusCodes_1.STATUS_CODES.FORBIDDEN).json({ message: "User not found please register" });
                }
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { pass, cpass, email } = req.body;
                const id = undefined;
                const user = yield this.userUseCase.isEmailExist(email, id);
                if (user) {
                    if (pass !== cpass) {
                        return res.status(httpStatusCodes_1.STATUS_CODES.FORBIDDEN).json({ message: 'Password and confirm password does not match' });
                    }
                    const encrypted = yield this.encrypt.encrypt(pass);
                    const updated = yield this.userUseCase.resetPassword(email, encrypted);
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', updated });
                }
                else {
                    return res.status(httpStatusCodes_1.STATUS_CODES.FORBIDDEN).json({ message: 'User does not found please register' });
                }
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    getUserData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token === null || token === void 0 ? void 0 : token.slice(7), process.env.JWT_SECRET);
                    const user = yield this.userUseCase.findUserById(decoded.id);
                    if (user) {
                        return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', data: user });
                    }
                    return res.status(httpStatusCodes_1.STATUS_CODES.FORBIDDEN).json({ message: "The user does not exist on the user id" });
                }
                return res.status(httpStatusCodes_1.STATUS_CODES.UNAUTHORIZED).json({ message: "User verification not found" });
            }
            catch (err) {
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    updateImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { image, id } = req.body;
                const isExist = yield this.userUseCase.findUserById(id);
                if (isExist) {
                    const imageUrl = yield (0, cloudinart_1.uploadImageToCloudinary)(image);
                    if (isExist.profile) {
                        yield (0, cloudinart_1.removeImage)(isExist.profile);
                    }
                    const data = yield this.userUseCase.ProfileImage(imageUrl, id);
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', data });
                }
                return res.status(httpStatusCodes_1.STATUS_CODES.BAD_REQUEST).json({ message: 'User does not exist' });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, age, gender, language, mobile, secondaryMobile } = req.body;
                const token = req.headers.authorization;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token === null || token === void 0 ? void 0 : token.slice(7), process.env.JWT_SECRET);
                    const user = yield this.userUseCase.isEmailExist(email, decoded.id);
                    if (user) {
                        return res.status(httpStatusCodes_1.STATUS_CODES.FORBIDDEN).json({ message: 'Your profile is not updated , email address already exist', role: 'email' });
                    }
                    const data = yield this.userUseCase.updateUser(decoded.id, { name, email, age, gender, language, mobile, secondaryMobile });
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', data });
                }
                return res.status(httpStatusCodes_1.STATUS_CODES.BAD_REQUEST).json({ message: 'Your authentication token is missing please provide token' });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    updateLastseen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token === null || token === void 0 ? void 0 : token.slice(7), process.env.JWT_SECRET);
                    const data = yield this.userUseCase.updateLastseen(decoded.id);
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: "success", data });
                }
                else {
                    return res.status(httpStatusCodes_1.STATUS_CODES.UNAUTHORIZED).json({ message: "Please login your token is missing" });
                }
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    updateAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const address = req.body;
                const token = req.headers.authorization;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token === null || token === void 0 ? void 0 : token.slice(7), process.env.JWT_SECRET);
                    const data = yield this.userUseCase.updateAddress(decoded.id, address);
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', data });
                }
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    updateUnRead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, count } = req.body;
                const data = yield this.userUseCase.updateCount(id, count);
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', data });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    updateNewMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, count } = req.body;
                const data = yield this.userUseCase.updateNewMessage(id, count);
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', data });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
}
exports.userController = userController;
