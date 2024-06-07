"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailTransporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require('dotenv').config();
exports.mailTransporter = nodemailer_1.default.createTransport({
    // port for secure SMTP
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Port for secure SMTP
    tls: { rejectUnauthorized: false },
    requireTLS: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
