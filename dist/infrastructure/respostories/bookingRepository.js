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
exports.bookingRepository = void 0;
const bookingModel_1 = __importDefault(require("../../entities_models/bookingModel"));
class bookingRepository {
    saveBooking(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield new bookingModel_1.default(data).save();
            }
            catch (err) {
                throw err;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield bookingModel_1.default.findById(id);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                yield bookingModel_1.default.updateMany({
                    type: 'one-way',
                    'period.date': {
                        $gte: yesterday,
                        $lt: today
                    }
                }, { $set: { status: 'Completed' } });
                yield bookingModel_1.default.updateMany({ type: 'round-way', 'returnDate': { $lt: new Date() } }, { $set: { status: 'Completed' } });
                return data;
            }
            catch (err) {
                throw err;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield bookingModel_1.default.deleteMany({ payment: false });
                //         const today = new Date();
                // today.setUTCHours(0, 0, 0, 0); // Set the time to the start of today in UTC
                // const yesterdayStart = new Date(today);
                // yesterdayStart.setUTCDate(today.getUTCDate() - 1); // Set the date to yesterday
                // yesterdayStart.setUTCHours(0, 0, 0, 0); // Ensure the time is the start of the day
                // const yesterdayEnd = new Date(today);
                // yesterdayEnd.setUTCDate(today.getUTCDate() - 1); // Set the date to yesterday
                // yesterdayEnd.setUTCHours(23, 59, 59, 999); // Ensure the time is the end of the day
                // await bookingSchema.updateMany(
                //     {
                //         type: 'one-way',
                //         'period.date': {
                //             $gte: yesterdayStart,
                //             $lt: today 
                //         }
                //     },
                //     { $set: { status: 'Completed' } }
                // );          
                yield bookingModel_1.default.updateMany({ type: 'round-way', 'returnDate': { $lt: new Date() } }, { $set: { status: 'Completed' } });
                yield bookingModel_1.default.updateMany({ type: 'one-way', 'period.date': { $lt: new Date() } }, { $set: { status: 'Completed' } });
                return yield bookingModel_1.default.find({ payment: true }).populate('vehicle').populate('driver');
            }
            catch (err) {
                throw err;
            }
        });
    }
    findByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield bookingModel_1.default.deleteMany({ payment: false });
                yield bookingModel_1.default.updateMany({ type: 'round-way', 'returnDate': { $lt: new Date() } }, { $set: { status: 'Completed' } });
                yield bookingModel_1.default.updateMany({ type: 'one-way', 'period.date': { $lt: new Date() } }, { $set: { status: 'Completed' } });
                return yield bookingModel_1.default.find({ userId: id }).populate('vehicle').populate('driver');
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('updating', id, status);
                return yield bookingModel_1.default.findOneAndUpdate({ _id: id }, { payment: status });
            }
            catch (err) {
                throw err;
            }
        });
    }
    bookingStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bookingModel_1.default.findByIdAndUpdate(id, { status: status });
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.bookingRepository = bookingRepository;
