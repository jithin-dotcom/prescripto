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
exports.checkRole = void 0;
const user_repositories_1 = require("../repositories/implementation/user.repositories");
const checkRole = (requiredRole) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized: Missing user" });
            return;
        }
        const userRepo = new user_repositories_1.UserRepository();
        const user = yield userRepo.findById(userId);
        if (!user || user.role !== requiredRole) {
            res.status(403).json({ message: "Forbidden: Insufficient permissions" });
            return;
        }
        next();
    });
};
exports.checkRole = checkRole;
