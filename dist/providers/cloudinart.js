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
exports.removeImage = exports.uploadAudioToCloudinary = exports.uploadImageToCloudinary = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dp5y9nivq',
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const uploadImageToCloudinary = (base64String) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary.uploader.upload(base64String, { resource_type: "auto" });
        console.log("Image uploaded successfully:", result.url);
        return result.url;
    }
    catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
    }
});
exports.uploadImageToCloudinary = uploadImageToCloudinary;
const uploadAudioToCloudinary = (base64String) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary.uploader.upload(base64String, { resource_type: "video" });
        console.log("Audio uploaded successfully:", result.url);
        return result.url;
    }
    catch (error) {
        console.error("Error uploading audio to Cloudinary:", error);
        throw error;
    }
});
exports.uploadAudioToCloudinary = uploadAudioToCloudinary;
const removeImage = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary.uploader.destroy(url);
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.removeImage = removeImage;
