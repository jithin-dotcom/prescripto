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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientProfileService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = require("../../config/cloudinary");
class PatientProfileService {
    constructor(_patientRepo, _userRepo) {
        this._patientRepo = _patientRepo;
        this._userRepo = _userRepo;
    }
    createPatientProfile(patientId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!patientId) {
                    throw new Error("Patient ID is required");
                }
                const existing = yield this._patientRepo.findByPatientId(patientId);
                if (existing) {
                    throw new Error("Profile already exists");
                }
                const profileData = Object.assign(Object.assign({}, data), { patientId: new mongoose_1.default.Types.ObjectId(patientId) });
                yield this._patientRepo.create(profileData);
                return { message: "Successfully Created Profile" };
            }
            catch (error) {
                console.error("Error in creating profile:", error);
                throw error;
            }
        });
    }
    editPatientProfile(patientId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existing = yield this._patientRepo.findByPatientId(patientId);
                if (!existing) {
                    throw new Error("Profile not found");
                }
                const updated = yield this._patientRepo.updateByPatientId(patientId, data);
                if (!updated) {
                    throw new Error("Failed to update profile");
                }
                return { message: "Profile Edited successfully" };
            }
            catch (error) {
                console.error("Error in editing profile: ", error);
                throw error;
            }
        });
    }
    deletePatientProfile(patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existing = yield this._patientRepo.findByPatientId(patientId);
                if (!existing) {
                    throw new Error("Patient profile not found");
                }
                yield this._patientRepo.deleteById(existing._id);
            }
            catch (error) {
                console.error("error deleting the patient : ", error);
                throw error;
            }
        });
    }
    uploadProfilePhoto(userId, file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = yield (0, cloudinary_1.uploadToCloudinary)(file.buffer, "telecare/profile_photos");
                const updatedUser = yield this._userRepo.updatePhoto(userId, url);
                return updatedUser;
            }
            catch (error) {
                console.error("Error uploading profile photo:", error);
                throw new Error("Failed to upload profile photo");
            }
        });
    }
}
exports.PatientProfileService = PatientProfileService;
