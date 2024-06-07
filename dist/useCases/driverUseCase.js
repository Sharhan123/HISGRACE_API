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
exports.driverUseCase = void 0;
class driverUseCase {
    constructor(driverReository, mailer) {
        this.driverReository = driverReository;
        this.mailer = mailer;
    }
    findDriverById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.driverReository.findById(id);
        });
    }
    sendTimeoutOTP(email, OTP, name) {
        try {
            this.mailer.sendDriverOtp(email, OTP, name);
            // setTimeout(async() => {
            //     await this.driverReository.unSetOtp(email)
            // }, 60000)
        }
        catch (error) {
            console.log(error);
            throw Error('Error while sending timeout otp');
        }
    }
    updateVerification(email) {
        return this.driverReository.updateStatus(email);
    }
    isExist(mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.driverReository.findByEmail(mobile);
        });
    }
    saveDriver(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.driverReository.saveDriver(driver);
        });
    }
    getDrivers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.driverReository.findAllDriver();
        });
    }
    updateDriver(id, driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.driverReository.updateById(id, driver);
        });
    }
    deleteDriver(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.driverReository.deleteById(id);
        });
    }
    blockDriver(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.driverReository.blockById(id);
        });
    }
    updateRequest(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.driverReository.updateRequest(id, status);
        });
    }
    sentRequestMail(email, status, name) {
        return __awaiter(this, void 0, void 0, function* () {
            this.mailer.sendRequestMail(email, name, status);
            return;
        });
    }
    removeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.driverReository.removeById(id);
        });
    }
}
exports.driverUseCase = driverUseCase;
