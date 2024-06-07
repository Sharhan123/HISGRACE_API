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
exports.vehicleUseCase = void 0;
class vehicleUseCase {
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }
    addVehicle(vehicle) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicleRes = yield this.vehicleRepository.saveVehicle(vehicle);
            return vehicleRes;
        });
    }
    getAllvehicles() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.vehicleRepository.findAll();
        });
    }
    vehicleExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.vehicleRepository.checkExist(id);
        });
    }
    findVehicle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.vehicleRepository.findById(id);
        });
    }
    deleteVehicle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.vehicleRepository.deleteById(parseFloat(id));
        });
    }
    updateVehicle(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.vehicleRepository.updateByID(data);
        });
    }
    blockAndUnblock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.vehicleRepository.BlockByID(id);
        });
    }
    updateBooking(id, booking) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.vehicleRepository.updatebooking(id, booking);
        });
    }
    setReview(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.vehicleRepository.setReview(id, data);
        });
    }
}
exports.vehicleUseCase = vehicleUseCase;
