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
exports.packageUseCase = void 0;
class packageUseCase {
    constructor(packageRepository) {
        this.packageRepository = packageRepository;
    }
    addPackage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.packageRepository.savePackage(data);
        });
    }
    packageExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.packageRepository.findById(id);
        });
    }
    getPackages() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.packageRepository.getPackages();
        });
    }
    editPackage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.packageRepository.editById(data);
        });
    }
    deletePackage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.packageRepository.deleteById(id);
        });
    }
    blockAndUnblock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.packageRepository.blockAndUnblock(id);
        });
    }
}
exports.packageUseCase = packageUseCase;
