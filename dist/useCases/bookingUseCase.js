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
exports.bookingusecase = void 0;
class bookingusecase {
    constructor(bookingRepository) {
        this.bookingRepository = bookingRepository;
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookingRepository.findById(id);
        });
    }
    findByUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookingRepository.findByUserId(id);
        });
    }
    saveBooking(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookingRepository.saveBooking(data);
        });
    }
    updatePayment(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookingRepository.updateStatus(id, status);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookingRepository.findAll();
        });
    }
    bookingStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookingRepository.bookingStatus(id, status);
        });
    }
}
exports.bookingusecase = bookingusecase;
