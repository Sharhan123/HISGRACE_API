"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../providers/controllers");
const packageRouter = express_1.default.Router();
packageRouter.post('/addPackage', (req, res) => controllers_1.pController.addPackage(req, res));
packageRouter.get('/getPackages', (req, res) => controllers_1.pController.getPackages(req, res));
packageRouter.post('/editPackage', (req, res) => controllers_1.pController.editPackage(req, res));
packageRouter.delete('/deletePackage/:id', (req, res) => controllers_1.pController.deletePackage(req, res));
packageRouter.get('/blockPackage/:id', (req, res) => controllers_1.pController.blockAndUnblock(req, res));
packageRouter.get('/findById/:id', (req, res) => controllers_1.pController.findPackage(req, res));
exports.default = packageRouter;
