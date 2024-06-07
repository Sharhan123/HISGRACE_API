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
exports.packageController = void 0;
const httpStatusCodes_1 = require("../constants/httpStatusCodes");
const cloudinart_1 = require("../providers/cloudinart");
class packageController {
    constructor(packageUseCase) {
        this.packageUseCase = packageUseCase;
    }
    addPackage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, car, location, days, perDay, desc, total, image } = req.body;
                const data = {
                    title: title,
                    vehicle: car,
                    days: days,
                    location: location,
                    perDay: perDay,
                    desc: desc,
                    total: total,
                    image: image
                };
                const saved = yield this.packageUseCase.addPackage(data);
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', saved });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    getPackages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.packageUseCase.getPackages();
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', data });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    editPackage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, car, title, days, desc, perDay, total, image, location, changed } = req.body;
                let imageUrl = image;
                if (changed) {
                    imageUrl = yield (0, cloudinart_1.uploadImageToCloudinary)(image);
                }
                const data = {
                    id: _id,
                    vehicle: car,
                    title: title,
                    days: days,
                    desc: desc,
                    perDay: perDay,
                    total: total,
                    location: location,
                    image: imageUrl
                };
                const response = yield this.packageUseCase.editPackage(data);
                if (response) {
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', data: response });
                }
                return res.status(httpStatusCodes_1.STATUS_CODES.UNAUTHORIZED).json({ message: 'The package was not found' });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    deletePackage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (id) {
                    const response = yield this.packageUseCase.deletePackage(id);
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', data: response });
                }
                return res.status(httpStatusCodes_1.STATUS_CODES.UNAUTHORIZED).json({ message: 'Package id not found as params' });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    blockAndUnblock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const isExist = yield this.packageUseCase.packageExist(id);
                if (isExist) {
                    const data = yield this.packageUseCase.blockAndUnblock(id);
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', data });
                }
                return res.status(httpStatusCodes_1.STATUS_CODES.FORBIDDEN).json({ message: 'The package you trying to block is not exist' });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    findPackage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const data = yield this.packageUseCase.packageExist(id);
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', data });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
}
exports.packageController = packageController;
