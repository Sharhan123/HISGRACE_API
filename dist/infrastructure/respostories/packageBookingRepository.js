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
exports.PackageBookingRepository = void 0;
const packageBookingModel_1 = __importDefault(require("../../entities_models/packageBookingModel"));
class PackageBookingRepository {
    saveBooking(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield new packageBookingModel_1.default(data).save();
            }
            catch (err) {
                throw err;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield packageBookingModel_1.default.findById(id);
                // await bookingSchema.updateMany({type: 'one-way','period.date': { $lt: new Date() }},{ $set: { status: 'Completed' } } )            
                // await bookingSchema.updateMany({type: 'round-way','returnDate': { $lt: new Date() }},{ $set: { status: 'Completed' } } ) 
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
                return yield packageBookingModel_1.default.find({}).populate({
                    path: 'package',
                    populate: {
                        path: 'vehicle'
                    }
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
    findByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('heyy');
                const data = yield packageBookingModel_1.default.find({ userId: id }).populate({
                    path: 'package',
                    populate: {
                        path: 'vehicle'
                    }
                });
                console.log(data);
                return data;
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
                return yield packageBookingModel_1.default.findOneAndUpdate({ _id: id }, { status: status });
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.PackageBookingRepository = PackageBookingRepository;
