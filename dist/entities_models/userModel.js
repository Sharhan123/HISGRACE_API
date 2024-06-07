"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userAddress_1 = require("./subSchema/userAddress");
const userModel = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
    },
    secondaryMobile: {
        type: Number
    },
    profile: {
        type: String
    },
    otp: {
        type: Number
    },
    gender: {
        type: String
    },
    age: {
        type: String,
    },
    language: {
        type: String
    },
    isBlocked: {
        type: Boolean,
        default: false,
        required: true
    },
    address: userAddress_1.AddressSchema,
    lastseen: { type: Date, required: true, default: Date.now() },
    unRead: { type: Number, required: true, default: 0 },
    newMessage: { type: Number, required: true, default: 0 }
});
const userSchema = mongoose_1.default.model('Users', userModel);
exports.default = userSchema;
