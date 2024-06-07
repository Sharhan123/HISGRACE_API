"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../providers/controllers");
const packageBookingRouter = express_1.default.Router();
packageBookingRouter.post('/savePackageBooking', (req, res) => controllers_1.pbController.saveBooking(req, res));
packageBookingRouter.get('/getPackageBookings', (req, res) => controllers_1.pbController.getBookings(req, res));
packageBookingRouter.get('/getPackageBookingsByuser', (req, res) => controllers_1.pbController.getBookingByUser(req, res));
packageBookingRouter.post('/packageBookingStatus', (req, res) => controllers_1.pbController.bookingStatus(req, res));
exports.default = packageBookingRouter;
