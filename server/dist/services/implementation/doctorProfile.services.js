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
exports.DoctorProfileService = void 0;
const doctorProfileServices_1 = require("../../utils/mapper/doctorProfileServices");
const mongoose_1 = __importDefault(require("mongoose"));
class DoctorProfileService {
    constructor(_DoctorRepo) {
        this._DoctorRepo = _DoctorRepo;
    }
    createDoctorProfile(DoctorId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!DoctorId) {
                    throw new Error("Doctor ID is required");
                }
                const existing = yield this._DoctorRepo.findByDoctorId(DoctorId);
                if (existing) {
                    throw new Error("Profile already exists");
                }
                const profileData = Object.assign(Object.assign({}, data), { DoctorId: new mongoose_1.default.Types.ObjectId(DoctorId) });
                yield this._DoctorRepo.create(profileData);
                return { message: "profile created successfully" };
            }
            catch (error) {
                console.error("Error in creating profile:", error);
                throw error;
            }
        });
    }
    editDoctorProfile(DoctorId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existing = yield this._DoctorRepo.findByDoctorId(DoctorId);
                if (!existing) {
                    throw new Error("Profile not found");
                }
                const updated = yield this._DoctorRepo.updateByDoctorId(DoctorId, data);
                if (!updated) {
                    throw new Error("Failed to update profile");
                }
                return { message: "Updated successfully" };
            }
            catch (error) {
                console.error("Error in editing profile: ", error);
                throw error;
            }
        });
    }
    deleteDoctorProfile(DoctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existing = yield this._DoctorRepo.findByDoctorId(DoctorId);
                if (!existing) {
                    throw new Error("Doctor profile not found");
                }
                yield this._DoctorRepo.deleteById(existing._id);
            }
            catch (error) {
                console.error("error deleting the Doctor : ", error);
                throw error;
            }
        });
    }
    findDoctorProfileWithRatings() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctorProfiles = yield this._DoctorRepo.findTopDoctorsWithRating();
                console.log("doctorProfile : ", doctorProfiles);
                const nonNullProfiles = doctorProfiles.filter((profile) => profile !== null && profile.doctorId.isVerified === true);
                return (0, doctorProfileServices_1.mapDoctorProfiles)(nonNullProfiles);
            }
            catch (error) {
                console.error("Error in findDoctorProfileWithRatings:", error);
                throw error;
            }
        });
    }
}
exports.DoctorProfileService = DoctorProfileService;
