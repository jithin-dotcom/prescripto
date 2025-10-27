"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDoctorRatings = void 0;
const mapDoctorRatings = (ratings) => {
    return ratings.map((rating) => {
        const patient = rating.patientId;
        return {
            userName: (patient === null || patient === void 0 ? void 0 : patient.name) || "Unknown",
            rating: rating.rating,
            review: rating.review,
            time: rating.createdAt,
        };
    });
};
exports.mapDoctorRatings = mapDoctorRatings;
