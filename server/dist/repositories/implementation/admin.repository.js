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
exports.AdminRepository = void 0;
const base_repositories_1 = require("./base.repositories");
const user_models_1 = require("../../models/user.models");
class AdminRepository extends base_repositories_1.BaseRepository {
    constructor() {
        super(user_models_1.UserModel);
    }
    getAllByRole(role, limit, skip, search) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({ role, name: { $regex: search, $options: "i" } }).skip(skip).limit(limit).sort({ createdAt: -1 }).select("-password -refreshToken");
        });
    }
    countByRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.countDocuments({ role });
        });
    }
}
exports.AdminRepository = AdminRepository;
