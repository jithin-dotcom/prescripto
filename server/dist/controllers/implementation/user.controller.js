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
exports.UserController = void 0;
const cloudinary_1 = require("../../config/cloudinary");
const statusCode_enum_1 = require("../../constants/statusCode.enum");
const statusMessage_1 = require("../../constants/statusMessage");
class UserController {
    constructor(_userService) {
        this._userService = _userService;
    }
    getAllDoctors(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 4;
                const search = req.query.search || "";
                const sort = req.query.sortBy || "createdAt";
                const specialty = req.query.specialty || "";
                const result = yield this._userService.getAllDoctors(page, limit, search, sort, specialty);
                res.status(statusCode_enum_1.StatusCode.OK).json({
                    message: statusMessage_1.StatusMessage.OK,
                    data: result.data,
                    page: result.page,
                    total: result.total,
                    totalPages: result.totalPages
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const result = yield this._userService.getProfile(userId);
                res.status(statusCode_enum_1.StatusCode.OK).json({ message: statusMessage_1.StatusMessage.OK, data: result });
                return;
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateUserOrDoctor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const userId = req.params.id;
                const { userData, profileData } = req.body;
                if (!userData || !profileData) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json({ success: false, message: statusMessage_1.StatusMessage.MISSING_DATA });
                    return;
                }
                const parsedUserData = JSON.parse(userData);
                const parsedProfileData = JSON.parse(profileData);
                const photoFile = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.photo) === null || _b === void 0 ? void 0 : _b[0];
                if (photoFile) {
                    const photoUrl = yield (0, cloudinary_1.uploadToCloudinary)(photoFile.buffer, "profile_photos");
                    parsedProfileData.photo = photoUrl;
                }
                const proofFiles = ((_c = req.files) === null || _c === void 0 ? void 0 : _c.proofDocument) || [];
                const proofUrls = [];
                for (const file of proofFiles) {
                    const url = yield (0, cloudinary_1.uploadToCloudinary)(file.buffer, "proof_documents");
                    proofUrls.push(url);
                }
                if (proofUrls.length > 0) {
                    parsedProfileData.proofDocuments = proofUrls;
                }
                const data = yield this._userService.updateUserOrDoctor(userId, parsedUserData, parsedProfileData);
                res.status(statusCode_enum_1.StatusCode.OK).json({
                    success: true,
                    data,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                console.log("entered into changePassword controller");
                const { password, newPassword } = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(statusCode_enum_1.StatusCode.UNAUTHORIZED).json(statusMessage_1.StatusMessage.UNAUTHORIZED);
                    return;
                }
                if (!password || !newPassword) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json("Password or newPassword missing");
                    return;
                }
                yield this._userService.changePassword(userId, password, newPassword);
                console.log("changed password successfully");
                res.status(statusCode_enum_1.StatusCode.OK).json({ message: "Password changed successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    changeEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                console.log("entered into controller");
                const { password, newEmail } = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(statusCode_enum_1.StatusCode.UNAUTHORIZED).json(statusMessage_1.StatusMessage.UNAUTHORIZED);
                    return;
                }
                if (!password || !newEmail) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json("Password or Email missing");
                    return;
                }
                yield this._userService.changeEmail(userId, password, newEmail);
                res.status(statusCode_enum_1.StatusCode.OK).json({ message: "Email updated successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
