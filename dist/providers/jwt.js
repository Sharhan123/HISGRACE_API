"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTTOKEN = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants/constants");
class JWTTOKEN {
    generateAccessToken(id, role) {
        const key = process.env.JWT_SECRET;
        if (key !== undefined) {
            const exp = Math.floor(Date.now() / 1000) + constants_1.accessTokenExp;
            return jsonwebtoken_1.default.sign({ id, role, exp }, key);
        }
        throw new Error('key not found');
    }
    generateRefreshToken(id, name, email, role) {
        const key = process.env.JWT_SECRET;
        if (key !== undefined) {
            const exp = Math.floor(Date.now() / 1000) + constants_1.refreshTokenExp;
            return jsonwebtoken_1.default.sign({ id, name, email, role, exp }, key);
        }
        throw new Error("key not found");
    }
    generateRefreshTokenImage(id, name, email, image, role) {
        const key = process.env.JWT_SECRET;
        if (key !== undefined) {
            const exp = Math.floor(Date.now() / 1000) + constants_1.refreshTokenExp;
            return jsonwebtoken_1.default.sign({ id, name, email, image, role, exp }, key);
        }
        throw new Error("key not found");
    }
    generateAdminToken(email, role) {
        const key = process.env.JWT_SECRET;
        if (key !== undefined) {
            const exp = Math.floor(Date.now() / 1000) + constants_1.accessTokenExp;
            return jsonwebtoken_1.default.sign({ email, role, exp }, key);
        }
        throw new Error("Key not found");
    }
    generateTempToken(id) {
        const key = process.env.JWT_SECRET;
        if (key !== undefined) {
            const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
            const exp = currentTimestampInSeconds + (60 * 60);
            return jsonwebtoken_1.default.sign({ id, exp }, key);
        }
        throw new Error('key not found');
    }
}
exports.JWTTOKEN = JWTTOKEN;
