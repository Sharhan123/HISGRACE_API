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
exports.packageBookingUsecase = void 0;
class packageBookingUsecase {
    constructor(packageRepository) {
        this.packageRepository = packageRepository;
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.packageRepository.findById(id);
        });
    }
    findByUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.packageRepository.findByUserId(id);
        });
    }
    saveBooking(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.packageRepository.saveBooking(data);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.packageRepository.findAll();
        });
    }
    bookingStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.packageRepository.updateStatus(id, status);
        });
    }
}
exports.packageBookingUsecase = packageBookingUsecase;
