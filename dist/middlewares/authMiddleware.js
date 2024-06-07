"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.', role: 'token' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (jwtSecret) {
            const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
            req.user = decoded;
            next();
        }
    }
    catch (error) {
        return res.status(401).json({ message: 'Your token is invalid please login again', role: 'token' });
    }
};
exports.authMiddleware = authMiddleware;
