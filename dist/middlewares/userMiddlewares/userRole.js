"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRole = void 0;
const adminRole = (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== 'user') {
        return res.status(403).json({ message: 'Access denied. User role required.', role: 'token' });
    }
    next();
};
exports.adminRole = adminRole;
