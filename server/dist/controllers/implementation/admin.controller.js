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
exports.AdminController = void 0;
const cloudinary_1 = require("../../config/cloudinary");
const statusCode_enum_1 = require("../../constants/statusCode.enum");
const statusMessage_1 = require("../../constants/statusMessage");
class AdminController {
    constructor(_adminService) {
        this._adminService = _adminService;
    }
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = req.params.id;
                if (!userId) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json({ message: "userId is missing" });
                    return;
                }
                const result = yield this._adminService.getUserById(userId);
                res.status(statusCode_enum_1.StatusCode.OK).json({ message: statusMessage_1.StatusMessage.OK, data: result });
                return;
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._adminService.getAllUsers();
                res.status(statusCode_enum_1.StatusCode.OK).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getUsersByRole(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let role = req.query.role;
                if (!role)
                    role = "user";
                let page = parseInt(req.query.page) || 1;
                let limit = parseInt(req.query.limit) || 10;
                let search = typeof req.query.search === "string" ? req.query.search : "";
                let specialty = typeof req.query.specialty === "string" ? req.query.specialty : "";
                console.log("limit : ", limit);
                if (page < 1)
                    page = 1;
                if (limit < 1)
                    limit = 10;
                const result = yield this._adminService.getAllByRole(role, page, limit, search, specialty);
                res.status(statusCode_enum_1.StatusCode.OK).json({
                    success: true,
                    message: `${role.charAt(0).toUpperCase() + role.slice(1)}s fetched successfully`,
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    createUserOrDoctor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
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
                parsedProfileData.proofDocuments = proofUrls;
                const result = yield this._adminService.createUserOrDoctor({
                    userData: parsedUserData,
                    profileData: parsedProfileData,
                });
                res.status(statusCode_enum_1.StatusCode.CREATED).json({
                    success: true,
                    message: result.message,
                    userId: result.userId,
                });
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
                const message = yield this._adminService.updateUserOrDoctor(userId, parsedUserData, parsedProfileData);
                res.status(statusCode_enum_1.StatusCode.OK).json({
                    success: true,
                    message,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteUserOrDoctor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const result = yield this._adminService.deleteUserOrDoctor(userId);
                res.status(statusCode_enum_1.StatusCode.OK).json({
                    success: true,
                    message: result.message,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    toggleBlockUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const result = yield this._adminService.toggleBlockUser(userId);
                res.status(statusCode_enum_1.StatusCode.OK).json({
                    success: true,
                    message: result.message,
                    isBlocked: result.isBlocked
                });
                return;
            }
            catch (error) {
                console.error("Error in toggleBlockUser:", error);
                if (error instanceof Error) {
                    res.status(statusCode_enum_1.StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
                }
                else {
                    res.status(statusCode_enum_1.StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: statusMessage_1.StatusMessage.INTERNAL_SERVER_ERROR });
                }
            }
        });
    }
    toggleVerifyUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const result = yield this._adminService.toggleVerifyUser(userId);
                res.status(statusCode_enum_1.StatusCode.OK).json({
                    success: true,
                    message: result.message,
                    isVerified: result.isVerified
                });
                return;
            }
            catch (error) {
                console.error("Error in toggleVerifyUser:", error);
                if (error instanceof Error) {
                    res.status(statusCode_enum_1.StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
                }
                else {
                    res.status(statusCode_enum_1.StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: statusMessage_1.StatusMessage.INTERNAL_SERVER_ERROR });
                }
            }
        });
    }
}
exports.AdminController = AdminController;
