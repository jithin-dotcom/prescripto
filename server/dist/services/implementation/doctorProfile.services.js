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
exports.DoctorProfileService = void 0;
const doctorProfileServices_1 = require("../../utils/mapper/doctorProfileServices");
const doctorProfileService_1 = require("../../utils/reverseMapper/doctorProfileService/doctorProfileService");
class DoctorProfileService {
    constructor(_DoctorRepo) {
        this._DoctorRepo = _DoctorRepo;
    }
    createDoctorProfile(doctorId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!doctorId) {
                    throw new Error("Doctor ID is required");
                }
                const existing = yield this._DoctorRepo.findByDoctorId(doctorId);
                if (existing) {
                    throw new Error("Profile already exists");
                }
                const profileData = (0, doctorProfileService_1.mapCreateDoctorProfileDTOToEntity)(doctorId, data);
                yield this._DoctorRepo.create(profileData);
                return { message: "Profile created successfully" };
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
    findDoctorProfileWithRatings() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctorProfiles = yield this._DoctorRepo.findTopDoctorsWithRating();
                const nonNullProfiles = doctorProfiles.filter((profile) => profile !== null && profile.doctorId.isVerified === true);
                const topFourProfile = nonNullProfiles.slice(0, 4);
                return (0, doctorProfileServices_1.mapDoctorProfiles)(topFourProfile);
            }
            catch (error) {
                console.error("Error in findDoctorProfileWithRatings:", error);
                throw error;
            }
        });
    }
}
exports.DoctorProfileService = DoctorProfileService;
