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
exports.DoctorProfileController = void 0;
const doctorProfile_schema_1 = require("../../validations/doctorProfile.schema");
const statusCode_enum_1 = require("../../constants/statusCode.enum");
const statusMessage_1 = require("../../constants/statusMessage");
class DoctorProfileController {
    constructor(_doctorProfileService) {
        this._doctorProfileService = _doctorProfileService;
    }
    ;
    createProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { doctorId } = req.params;
                const validatedData = doctorProfile_schema_1.doctorProfileSchema.parse(Object.assign(Object.assign({}, req.body), { doctorId }));
                const profile = yield this._doctorProfileService.createDoctorProfile(doctorId, validatedData);
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
                const { doctorId } = req.params;
                if (!doctorId) {
                    res.send(statusCode_enum_1.StatusCode.BAD_REQUEST).json({ message: statusMessage_1.StatusMessage.MISSING_ID });
                    return;
                }
                const validatedData = doctorProfile_schema_1.doctorProfileSchema.partial().parse(req.body);
                const updated = yield this._doctorProfileService.editDoctorProfile(doctorId, validatedData);
                res.status(statusCode_enum_1.StatusCode.OK).json(updated);
            }
            catch (error) {
                res.status(statusCode_enum_1.StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message || "Error updating profile" });
            }
        });
    }
    deleteProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { doctorId } = req.params;
                if (!doctorId) {
                    res.send(statusCode_enum_1.StatusCode.BAD_REQUEST).json({ message: statusMessage_1.StatusMessage.MISSING_ID });
                }
                yield this._doctorProfileService.deleteDoctorProfile(doctorId);
                res.status(statusCode_enum_1.StatusCode.NO_CONTENT).json({ message: statusMessage_1.StatusMessage.NO_CONTENT });
            }
            catch (error) {
                res.status(statusCode_enum_1.StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message || statusMessage_1.StatusMessage.INTERNAL_SERVER_ERROR });
            }
        });
    }
    findDoctorWithRating(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this._doctorProfileService.findDoctorProfileWithRatings();
                if (!response) {
                    res.status(statusCode_enum_1.StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Doctors not found" });
                    return;
                }
                res.status(statusCode_enum_1.StatusCode.OK).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.DoctorProfileController = DoctorProfileController;
