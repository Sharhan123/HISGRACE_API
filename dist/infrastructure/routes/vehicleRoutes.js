"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../providers/controllers");
const vehicleRouter = express_1.default.Router();
vehicleRouter.post('/addVehicle', (req, res) => controllers_1.vController.addVehicle(req, res));
vehicleRouter.get('/getAllVehices', (req, res) => controllers_1.vController.getAllVehicles(req, res));
vehicleRouter.delete('/deleteVehicle/:id', (req, res) => controllers_1.vController.deleteVehicle(req, res));
vehicleRouter.post('/updateVehicle', (req, res) => controllers_1.vController.updateVehicle(req, res));
vehicleRouter.get('/blockVehicle/:id', (req, res) => controllers_1.vController.blockAndUnblock(req, res));
vehicleRouter.post('/getBookingVehicles', (req, res) => controllers_1.vController.checkAvailability(req, res));
vehicleRouter.post('/setReview', (req, res) => controllers_1.vController.setReview(req, res));
exports.default = vehicleRouter;
