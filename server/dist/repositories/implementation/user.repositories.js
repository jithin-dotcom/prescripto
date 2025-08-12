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
exports.UserRepository = void 0;
const user_models_1 = require("../../models/user.models");
const base_repositories_1 = require("./base.repositories");
class UserRepository extends base_repositories_1.BaseRepository {
    constructor() {
        super(user_models_1.UserModel);
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOne({ email });
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.create(userData);
        });
    }
    updatePasswordByEmail(email, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.updateOne({ email }, { $set: { password: hashedPassword } });
        });
    }
    updatePhoto(userId, photoUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_models_1.UserModel.findByIdAndUpdate(userId, { photo: photoUrl }, { new: true });
        });
    }
    findTopDoctors() {
        return __awaiter(this, arguments, void 0, function* (limit = 4) {
            return yield this.model.find({ role: "doctor", isBlocked: false, isVerified: true }).sort({ createdAt: -1 }).limit(limit);
        });
    }
    count(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.countDocuments(filter);
        });
    }
}
exports.UserRepository = UserRepository;
