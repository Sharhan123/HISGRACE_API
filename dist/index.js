"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./infrastructure/config/app");
const db_1 = require("./infrastructure/config/db");
// import http from 'http'
const socketIo_1 = __importDefault(require("./providers/socketIo"));
const PORT = process.env.PORT || 4000;
const app = (0, app_1.createServer)();
(0, db_1.mongoConnect)().then(() => {
    if (socketIo_1.default) {
        // const server = http.createServer(app)
        socketIo_1.default.listen(PORT, () => console.log(`Server Connected ${PORT}`));
    }
    else {
        throw new Error('app is undefined');
    }
}).catch(err => console.log('error while connecting to mongodb\n', err));
