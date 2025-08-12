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
exports.WalletController = void 0;
const statusCode_enum_1 = require("../../constants/statusCode.enum");
const statusMessage_1 = require("../../constants/statusMessage");
class WalletController {
    constructor(_walletService) {
        this._walletService = _walletService;
    }
    getWallet(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
                if (!userId || !role) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json(statusMessage_1.StatusMessage.BAD_REQUEST);
                    return;
                }
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 5;
                const response = yield this._walletService.getWallet(userId, role, page, limit);
                res.status(statusCode_enum_1.StatusCode.OK).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    makeWalletPayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
                const { appointmentId } = req.params;
                if (!userId && role === "user" && !appointmentId) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json(statusMessage_1.StatusMessage.BAD_REQUEST);
                    return;
                }
                const response = yield this._walletService.makeWalletPayment(userId, appointmentId);
                res.status(statusCode_enum_1.StatusCode.OK).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.WalletController = WalletController;
