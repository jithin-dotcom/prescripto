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
exports.PatientProfileController = void 0;
const patientProfile_schema_1 = require("../../validations/patientProfile.schema");
const statusCode_enum_1 = require("../../constants/statusCode.enum");
const statusMessage_1 = require("../../constants/statusMessage");
class PatientProfileController {
    constructor(_patientProfileService) {
        this._patientProfileService = _patientProfileService;
    }
    ;
    createProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { patientId } = req.params;
                const validatedData = patientProfile_schema_1.patientProfileSchema.parse(Object.assign(Object.assign({}, req.body), { patientId }));
                const profile = yield this._patientProfileService.createPatientProfile(patientId, validatedData);
                res.status(statusCode_enum_1.StatusCode.CREATED).json(profile);
            }
            catch (error) {
                if ((error === null || error === void 0 ? void 0 : error.name) === "ZodError") {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json({
                        message: error.errors.map((e) => e.message).join(", ")
                    });
                    return;
                }
                res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json({ message: error.message || "Failed to create profile" });
            }
        });
    }
    editProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { patientId } = req.params;
                if (!patientId) {
                    res.send(statusCode_enum_1.StatusCode.BAD_REQUEST).json({ message: statusMessage_1.StatusMessage.MISSING_ID });
                    return;
                }
                const validatedData = patientProfile_schema_1.patientProfileSchema.partial().parse(req.body);
                const updated = yield this._patientProfileService.editPatientProfile(patientId, validatedData);
                res.status(statusCode_enum_1.StatusCode.OK).json(updated);
            }
            catch (error) {
                res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json({ message: error.message || "Error updating profile" });
            }
        });
    }
    deleteProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { patientId } = req.params;
                if (!patientId) {
                    res.send(statusCode_enum_1.StatusCode.BAD_REQUEST).json({ message: statusMessage_1.StatusMessage.MISSING_ID });
                }
                yield this._patientProfileService.deletePatientProfile(patientId);
                res.status(statusCode_enum_1.StatusCode.NO_CONTENT).json({ message: statusMessage_1.StatusMessage.NO_CONTENT });
            }
            catch (error) {
                res.status(statusCode_enum_1.StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message || statusMessage_1.StatusMessage.INTERNAL_SERVER_ERROR });
            }
        });
    }
    uploadPhoto(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(statusCode_enum_1.StatusCode.UNAUTHORIZED).json({ message: statusMessage_1.StatusMessage.UNAUTHORIZED });
                    return;
                }
                if (!req.file) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json({ message: "No file uploaded" });
                    return;
                }
                const updatedUser = yield this._patientProfileService.uploadProfilePhoto(userId, req.file);
                res.status(statusCode_enum_1.StatusCode.OK).json({ message: "Photo uploaded", user: updatedUser });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.PatientProfileController = PatientProfileController;
