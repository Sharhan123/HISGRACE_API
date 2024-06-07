"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../providers/controllers");
const adminRouter = express_1.default.Router();
adminRouter.post('/signin', (req, res) => controllers_1.aConntroller.adminSigin(req, res));
adminRouter.get('/getUsers', (req, res) => controllers_1.aConntroller.getAllUsers(req, res));
adminRouter.get('/blockUser/:id', (req, res) => controllers_1.aConntroller.blockUser(req, res));
exports.default = adminRouter;
