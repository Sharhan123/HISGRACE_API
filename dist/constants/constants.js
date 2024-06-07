"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLES = exports.refreshTokenExp = exports.accessTokenExp = void 0;
exports.accessTokenExp = 3 * 60 * 60; // 3 hour
exports.refreshTokenExp = 24 * 60 * 60; // 24 hour
var ROLES;
(function (ROLES) {
    ROLES["USER"] = "user";
    ROLES["ADMIN"] = "admin";
    ROLES["DRIVER"] = "driver";
})(ROLES || (exports.ROLES = ROLES = {}));
