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
exports.DoctorRatingService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class DoctorRatingService {
    constructor(_doctorRatingRepo, _doctorProfileRepo) {
        this._doctorRatingRepo = _doctorRatingRepo;
        this._doctorProfileRepo = _doctorProfileRepo;
    }
    rateDoctor(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("entered into rateDoctor services");
                const { userId, doctorId, appointmentId, rating, review } = data;
                const rated = yield this._doctorRatingRepo.findOne({ appointmentId });
                if (rated) {
                    throw new Error("You have already rated this doctor for this appointment");
                }
                const createRating = yield this._doctorRatingRepo.create({
                    patientId: new mongoose_1.default.Types.ObjectId(userId),
                    doctorId: new mongoose_1.default.Types.ObjectId(doctorId),
                    appointmentId: new mongoose_1.default.Types.ObjectId(appointmentId),
                    rating,
                    review,
                });
                if (!createRating) {
                    throw new Error("Failed to create Rating");
                }
                const doctorProfile = yield this._doctorProfileRepo.findOne({ doctorId });
                if (!doctorProfile) {
                    throw new Error("Doctor profile not found");
                }
                const oldAvg = (doctorProfile === null || doctorProfile === void 0 ? void 0 : doctorProfile.averageRating) || 0;
                const oldCount = (doctorProfile === null || doctorProfile === void 0 ? void 0 : doctorProfile.ratingCount) || 0;
                const newCount = oldCount + 1;
                const newAvg = parseFloat(((oldAvg * oldCount + rating) / newCount).toFixed(2));
                const updatedDoctor = yield this._doctorProfileRepo.updateByDoctorId(doctorId, { averageRating: newAvg, ratingCount: newCount });
                if (!updatedDoctor) {
                    throw new Error("Failed to update doctor");
                }
                console.log("updated doctor : ", updatedDoctor);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw error;
                }
                else {
                    throw new Error("Something went wrong");
                }
            }
        });
    }
    getRatingByDoctor(doctorId, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!doctorId)
                throw new Error("Doctor ID is missing");
            const skip = (page - 1) * limit;
            const { ratings, total } = yield this._doctorRatingRepo.getDoctorRating(doctorId, skip, limit);
            const stats = yield this._doctorRatingRepo.getDoctorRatingStats(doctorId);
            const result = ratings.map((rating) => {
                const patient = rating.patientId;
                return {
                    userName: patient.name || "Unknown",
                    rating: rating.rating,
                    review: rating.review,
                    time: rating.createdAt,
                };
            });
            return {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                itemsPerPage: limit,
                data: result,
                totalReviews: stats.totalReviews,
                averageRating: stats.averageRating,
                satisfactionPercent: stats.satisfactionPercent,
            };
        });
    }
}
exports.DoctorRatingService = DoctorRatingService;
