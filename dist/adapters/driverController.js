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
exports.driverController = void 0;
const httpStatusCodes_1 = require("../constants/httpStatusCodes");
const cloudinart_1 = require("../providers/cloudinart");
const constants_1 = require("../constants/constants");
class driverController {
    constructor(driverusecase, jwt) {
        this.driverusecase = driverusecase;
        this.jwt = jwt;
    }
    addDriver(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, vehicles, age, gender, mobile, exp, driverBata, image } = req.body;
                const driver = yield this.driverusecase.isExist(email);
                if (driver) {
                    return res.status(httpStatusCodes_1.STATUS_CODES.CONFLICT).json({ message: 'Email address already exist , driver already Registered ', role: 'email' });
                }
                const imageUrl = yield (0, cloudinart_1.uploadImageToCloudinary)(image);
                const OTP = Math.floor(1000 + Math.random() * 9000);
                const driverData = {
                    driverName: name,
                    age: age,
                    email: email,
                    gender: gender,
                    vehicles: vehicles,
                    mobile: mobile,
                    password: password,
                    exp: exp,
                    driverBata: driverBata,
                    image: imageUrl,
                    status: OTP
                };
                const data = yield this.driverusecase.saveDriver(driverData);
                console.log(data, 'saved Data.......');
                this.driverusecase.sendTimeoutOTP(email, OTP, name);
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', data });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, our server is down it will be fixed soon' });
            }
        });
    }
    verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.body;
                const data = yield this.driverusecase.isExist(email);
                console.log(email, otp, 'entered.............');
                if (data) {
                    if (data.status === otp) {
                        const refreshToken = this.jwt.generateRefreshToken(data._id, data.driverName, data.email, constants_1.ROLES.DRIVER);
                        yield this.driverusecase.updateVerification(email);
                        return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', token: refreshToken });
                    }
                    else {
                        return res.status(httpStatusCodes_1.STATUS_CODES.BAD_REQUEST).json({ message: "Entered otp is incorrect" });
                    }
                }
                else {
                    console.log('no data');
                }
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, our server is down it will be fixed soon' });
            }
        });
    }
    findDriver(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const data = yield this.driverusecase.findDriverById(id);
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ messages: 'success', data });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, our server is down it will be fixed soon' });
            }
        });
    }
    getDrivers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.driverusecase.getDrivers();
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', data });
            }
            catch (err) {
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, our server is down it will be fixed soon' });
            }
        });
    }
    updateDriver(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, name, email, age, gender, image, changed, mobile, exp, driverBata, vehicles } = req.body;
                let imageUrl = image;
                if (changed) {
                    yield (0, cloudinart_1.removeImage)(image);
                    imageUrl = yield (0, cloudinart_1.uploadImageToCloudinary)(image);
                }
                const driver = {
                    driverName: name,
                    age: age,
                    email: email,
                    gender: gender,
                    image: imageUrl,
                    password: '',
                    exp: exp,
                    mobile: mobile,
                    driverBata: driverBata,
                    vehicles: vehicles,
                    status: ''
                };
                const data = yield this.driverusecase.updateDriver(id, driver);
                if (data) {
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', data });
                }
                return res.status(httpStatusCodes_1.STATUS_CODES.FORBIDDEN).json({ message: 'Your profile is not updated, occurs some error' });
            }
            catch (err) {
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, our server is down it will be fixed soon' });
            }
        });
    }
    deleteDriver(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const driver = yield this.driverusecase.findDriverById(id);
                if (driver) {
                    const data = yield this.driverusecase.deleteDriver(id);
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', data });
                }
                return res.status(httpStatusCodes_1.STATUS_CODES.FORBIDDEN).json({ message: "Sorry , the driver you are trying to delete not found " });
            }
            catch (err) {
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Sorry, our server is down it will be fixed soon" });
            }
        });
    }
    blockDriver(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const driver = yield this.driverusecase.findDriverById(id);
                if (driver) {
                    const data = yield this.driverusecase.blockDriver(id);
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: "success", data });
                }
                return res.status(httpStatusCodes_1.STATUS_CODES.FORBIDDEN).json({ message: "sorry, the driver you are trying to find does not exist" });
            }
            catch (err) {
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: "Sorry, our server is down it will be fixed soon" });
            }
        });
    }
    updateRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, status } = req.body;
                const driver = yield this.driverusecase.findDriverById(id);
                if (driver) {
                    yield this.driverusecase.updateRequest(id, status);
                    yield this.driverusecase.sentRequestMail(driver.email.toString(), status, driver.driverName.toString());
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success' });
                }
                return res.status(httpStatusCodes_1.STATUS_CODES.UNAUTHORIZED).json({ message: 'driver does not found' });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    removeDriver(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const data = yield this.driverusecase.removeById(id);
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', data });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    resendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const OTP = Math.floor(1000 + Math.random() * 9000);
                this.driverusecase.sendTimeoutOTP(email, OTP, 'Driver Hisgrace');
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success' });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    driverLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const driver = yield this.driverusecase.isExist(email);
                if (driver) {
                    if (driver.password === password) {
                        const refreshToken = this.jwt.generateRefreshToken(driver._id, driver.driverName, driver.email, constants_1.ROLES.DRIVER);
                        return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: "success", token: refreshToken });
                    }
                    else {
                        return res.status(httpStatusCodes_1.STATUS_CODES.FORBIDDEN).json({ message: "entered password is incorrect" });
                    }
                }
                return res.status(httpStatusCodes_1.STATUS_CODES.FORBIDDEN).json({ message: "User on this email address not exist " });
            }
            catch (err) {
                console.log(err, 'hiii');
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
}
exports.driverController = driverController;
