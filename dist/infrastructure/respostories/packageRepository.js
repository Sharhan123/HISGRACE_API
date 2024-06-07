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
exports.packageRepository = void 0;
const packageModel_1 = __importDefault(require("../../entities_models/packageModel"));
class packageRepository {
    savePackage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield new packageModel_1.default(data).save();
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    getPackages() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield packageModel_1.default.find().populate('vehicle');
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
                return yield packageModel_1.default.findById(id).populate('vehicle');
            }
            catch (err) {
                throw err;
            }
        });
    }
    editById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield packageModel_1.default.findByIdAndUpdate(data.id, { title: data.title, desc: data.desc, days: data.days, vehicle: data.vehicle, perDay: data.perDay, total: data.total, location: data.location, image: data.image });
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
                return yield packageModel_1.default.findByIdAndDelete(id);
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    blockAndUnblock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blocked = yield this.findById(id);
                return yield packageModel_1.default.findByIdAndUpdate(id, { isAvailable: !(blocked === null || blocked === void 0 ? void 0 : blocked.isAvailable) });
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.packageRepository = packageRepository;
