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
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const httpStatusCodes_1 = require("../constants/httpStatusCodes");
const constants_1 = require("../constants/constants");
class adminController {
    constructor(adminUseCase, jwtToken) {
        this.adminUseCase = adminUseCase;
        this.jwtToken = jwtToken;
    }
    adminSigin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const admin = yield this.adminUseCase.exist(email);
                console.log(admin + '.........');
                if (admin) {
                    if (admin.password === password) {
                        const token = this.jwtToken.generateAdminToken(admin.email, constants_1.ROLES.ADMIN);
                        return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: "success", token });
                    }
                    return res.status(httpStatusCodes_1.STATUS_CODES.FORBIDDEN).json({ password: "Entered password is incorrect" });
                }
                return res.status(httpStatusCodes_1.STATUS_CODES.FORBIDDEN).json({ email: "Entered email address is incorrect" });
            }
            catch (err) {
                console.log(err);
                res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "sorry unfortunately our server is down please try again later" });
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.adminUseCase.getAllUsers();
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ users, success: true });
            }
            catch (err) {
                console.log(err);
                res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "sorry unfortunately our server is down please try again later" });
            }
        });
    }
    blockUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (id) {
                    const resp = yield this.adminUseCase.blockUser(id);
                    console.log(resp + '..');
                    const blocked = resp === null || resp === void 0 ? void 0 : resp.isBlocked;
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ success: true, blocked });
                }
            }
            catch (err) {
                console.log(err);
                res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "sorry unfortunately our server is down please try again later" });
            }
        });
    }
}
exports.adminController = adminController;
