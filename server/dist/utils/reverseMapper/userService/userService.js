"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserToDTO = mapUserToDTO;
exports.mapPatientProfileToDTO = mapPatientProfileToDTO;
exports.mapDoctorProfileToDTO = mapDoctorProfileToDTO;
exports.mapPatientProfileDTOToPersistence = mapPatientProfileDTOToPersistence;
exports.mapDoctorProfileDTOToPersistence = mapDoctorProfileDTOToPersistence;
const mongoose_1 = __importDefault(require("mongoose"));
function mapUserToDTO(user) {
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.isVerified,
        photo: user.photo,
        signature: user.signature,
        isBlocked: user.isBlocked,
        password: user.password,
    };
}
function mapPatientProfileToDTO(profile) {
    return {
        patientId: profile.patientId.toString(),
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender,
        houseName: profile.houseName,
        city: profile.city,
        state: profile.state,
        country: profile.country,
        pin: profile.pin,
    };
}
function mapDoctorProfileToDTO(profile) {
    return {
        doctorId: profile.doctorId.toString(),
        educationDetails: profile.educationDetails,
        specialization: profile.specialization,
        registrationNumber: profile.registrationNumber,
        registrationYear: profile.registrationYear,
        yearOfExperience: profile.yearOfExperience,
        signature: profile.signature,
        proofDocuments: profile.proofDocuments,
        fee: profile.fee,
        about: profile.about,
        averageRating: profile.averageRating,
        ratingCount: profile.ratingCount,
        availability: profile.availability,
        slotDuration: profile.slotDuration,
    };
}
function mapPatientProfileDTOToPersistence(dto, userId) {
    return Object.assign(Object.assign({}, dto), { patientId: new mongoose_1.default.Types.ObjectId(userId) });
}
function mapDoctorProfileDTOToPersistence(dto, userId) {
    return Object.assign(Object.assign({}, dto), { doctorId: new mongoose_1.default.Types.ObjectId(userId) });
}
