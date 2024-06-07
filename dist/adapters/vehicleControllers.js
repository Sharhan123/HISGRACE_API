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
exports.vehicleController = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinart_1 = require("../providers/cloudinart");
const httpStatusCodes_1 = require("../constants/httpStatusCodes");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
class vehicleController {
    constructor(vehicleUseCase) {
        this.vehicleUseCase = vehicleUseCase;
        this.uploadImage = upload.array('image', 10);
    }
    addVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, type, fuel, seat, desc, sprice, price, image } = req.body;
                const imageUrl = yield (0, cloudinart_1.uploadImageToCloudinary)(image);
                const data = {
                    id: Math.random(),
                    vehicleName: name,
                    type: type,
                    fuel: fuel,
                    seat: seat,
                    desc: desc,
                    startingPrice: sprice,
                    price: price,
                    images: imageUrl
                };
                const response = yield this.vehicleUseCase.addVehicle(data);
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success' });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    getAllVehicles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.vehicleUseCase.getAllvehicles();
                const vehicles = [];
                data.forEach(e => {
                    vehicles.push(e.vehicleName);
                });
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ data: data, vehicles });
            }
            catch (err) {
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    deleteVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const vehicle = yield this.vehicleUseCase.vehicleExist(id);
                if (vehicle) {
                    this.vehicleUseCase.deleteVehicle(id);
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success' });
                }
                else {
                    return res.status(httpStatusCodes_1.STATUS_CODES.FORBIDDEN).json({ message: 'Vehicle not found' });
                }
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    updateVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, name, type, fuel, seat, sprice, price, desc, image, changed } = req.body;
                let imageUrl = image;
                if (changed) {
                    imageUrl = yield (0, cloudinart_1.uploadImageToCloudinary)(image);
                }
                const data = {
                    id: id,
                    vehicleName: name,
                    type: type,
                    seat: seat,
                    fuel: fuel,
                    desc: desc,
                    images: imageUrl,
                    price: price,
                    startingPrice: sprice
                };
                const response = yield this.vehicleUseCase.updateVehicle(data);
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', response });
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
                const isExist = yield this.vehicleUseCase.findVehicle(id);
                if (isExist) {
                    const data = yield this.vehicleUseCase.blockAndUnblock(id);
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', data });
                }
                return res.status(httpStatusCodes_1.STATUS_CODES.FORBIDDEN).json({ message: 'The vehicle you trying to block is not exist' });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    checkAvailability(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type, startingDate, endingDate } = req.body;
                const allVehicles = yield this.vehicleUseCase.getAllvehicles();
                const dateRange = this.getDatesBetween(new Date(startingDate), new Date(endingDate));
                const availableVehicles = allVehicles.filter(vehicle => {
                    if (vehicle.bookings && vehicle.bookings.length > 0) {
                        const bookings = vehicle.bookings;
                        return !dateRange.some(date => bookings.includes(date));
                    }
                    else {
                        return true;
                    }
                });
                return res.status(200).json({ message: 'Success', data: availableVehicles });
            }
            catch (error) {
                console.error('Error checking availability:', error);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    getDatesBetween(startDate, endDate) {
        const dates = [];
        let currentDate = new Date(startDate);
        while (currentDate <= new Date(endDate)) {
            dates.push(currentDate.toISOString().split('T')[0]); // Store date in YYYY-MM-DD format
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    }
    setReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, vehicle, review } = req.body;
                const reviewData = { user: user, review: review };
                const data = yield this.vehicleUseCase.setReview(vehicle, reviewData);
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: "success", data });
            }
            catch (err) {
                console.error('Error checking availability:', err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
}
exports.vehicleController = vehicleController;
