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
exports.vehicleRepository = void 0;
const vehicleModel_1 = __importDefault(require("../../entities_models/vehicleModel"));
class vehicleRepository {
    saveVehicle(vehicle) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("saving vehicle");
                return yield new vehicleModel_1.default(vehicle).save();
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield vehicleModel_1.default.find({});
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield vehicleModel_1.default.findOneAndDelete({ id: id });
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
                return yield vehicleModel_1.default.findById(id);
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    checkExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield vehicleModel_1.default.findOne({ id: id });
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateByID(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield vehicleModel_1.default.findOneAndUpdate({ id: data.id }, { vehicleName: data.vehicleName, type: data.type, desc: data.desc, fuel: data.fuel, seat: data.seat, startingPrice: data.startingPrice, price: data.price, images: data.images });
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    BlockByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicle = yield vehicleModel_1.default.findById(id);
                return yield vehicleModel_1.default.findByIdAndUpdate(id, { isBlocked: !(vehicle === null || vehicle === void 0 ? void 0 : vehicle.isBlocked) });
            }
            catch (err) {
                throw err;
            }
        });
    }
    updatebooking(id, booking) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield vehicleModel_1.default.findByIdAndUpdate(id, { $push: { bookings: booking } });
            }
            catch (err) {
                throw err;
            }
        });
    }
    setReview(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield vehicleModel_1.default.findByIdAndUpdate(id, { $push: { reviews: data } });
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.vehicleRepository = vehicleRepository;
