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
exports.driverRepository = void 0;
const driverModel_1 = __importDefault(require("../../entities_models/driverModel"));
class driverRepository {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield driverModel_1.default.findById(id);
            }
            catch (err) {
                throw err;
            }
        });
    }
    saveDriver(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield new driverModel_1.default(user).save();
            }
            catch (err) {
                throw err;
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield driverModel_1.default.findOne({ email: email });
            }
            catch (err) {
                throw err;
            }
        });
    }
    findAllDriver() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield driverModel_1.default.find({});
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateStatus(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield driverModel_1.default.findOneAndUpdate({ email: email }, { status: 'verified' });
            }
            catch (err) {
                throw err;
            }
        });
    }
    unSetOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield driverModel_1.default.findOneAndUpdate({ email: email }, { status: 'pending' });
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateById(id, driver) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield driverModel_1.default.findByIdAndUpdate(id, {
                    $set: { driverName: driver.driverName, age: driver.age, mobile: driver.mobile, gender: driver.gender, exp: driver.exp, driverBata: driver.driverBata, image: driver.image, vehicles: driver.vehicles }
                }, { new: true });
            }
            catch (Err) {
                throw Err;
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield driverModel_1.default.findByIdAndDelete(id);
            }
            catch (err) {
                throw err;
            }
        });
    }
    blockById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const driver = yield driverModel_1.default.findById(id);
                return driverModel_1.default.findByIdAndUpdate(id, { isAvailble: !(driver === null || driver === void 0 ? void 0 : driver.isAvailble) });
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateRequest(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield driverModel_1.default.findByIdAndUpdate(id, { status: status });
            }
            catch (err) {
                throw err;
            }
        });
    }
    removeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield driverModel_1.default.findByIdAndDelete(id);
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.driverRepository = driverRepository;
