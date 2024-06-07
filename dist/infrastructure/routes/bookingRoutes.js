"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../providers/controllers");
const bookingRouter = express_1.default.Router();
bookingRouter.post('/getBookingSession', (req, res) => controllers_1.bController.bookingSession(req, res));
bookingRouter.post('/webhook', (req, res) => controllers_1.bController.webhookRouter(req, res));
bookingRouter.get('/getBookings', (req, res) => controllers_1.bController.getBookings(req, res));
bookingRouter.get('/getBookingsByuser', (req, res) => controllers_1.bController.getBookingByUser(req, res));
bookingRouter.post('/bookingStatus', (req, res) => controllers_1.bController.bookingStatus(req, res));
exports.default = bookingRouter;
