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
exports.DoctorRatingRepository = void 0;
const doctorRating_models_1 = require("../../models/DoctorRating/doctorRating.models");
const base_repositories_1 = require("./base.repositories");
class DoctorRatingRepository extends base_repositories_1.BaseRepository {
    constructor() {
        super(doctorRating_models_1.DoctorRatingModel);
    }
    getDoctorRating(doctorId, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const [ratings, total] = yield Promise.all([
                this.model
                    .find({ doctorId })
                    .skip(skip)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .populate("patientId"),
                this.model.countDocuments({ doctorId }),
            ]);
            return { ratings, total };
        });
    }
    getDoctorRatingStats(doctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ratings = yield this.model.find({ doctorId }).select("rating");
            const totalReviews = ratings.length;
            const averageRating = totalReviews === 0
                ? 0
                : ratings.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
            const fiveStarCount = ratings.filter((r) => r.rating === 5).length;
            return {
                totalReviews,
                averageRating: Number(averageRating.toFixed(1)),
                satisfactionPercent: totalReviews === 0 ? 0 : Math.round((fiveStarCount / totalReviews) * 100),
            };
        });
    }
}
exports.DoctorRatingRepository = DoctorRatingRepository;
