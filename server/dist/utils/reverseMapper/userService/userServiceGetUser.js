"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapGetProfileUserDTO = mapGetProfileUserDTO;
exports.mapGetProfilePatientProfileDTO = mapGetProfilePatientProfileDTO;
exports.mapGetProfileDoctorProfileDTO = mapGetProfileDoctorProfileDTO;
function mapGetProfileUserDTO(user) {
    const obj = user.toObject();
    return {
        id: obj._id.toString(),
        name: obj.name,
        email: obj.email,
        role: obj.role,
        avatar: obj.avatar,
        isVerified: obj.isVerified,
        photo: obj.photo,
        signature: obj.signature,
        isBlocked: obj.isBlocked,
    };
}
function mapGetProfilePatientProfileDTO(profile) {
    if (!profile)
        return null;
    const obj = profile.toObject();
    return {
        id: obj._id.toString(),
        dateOfBirth: obj.dateOfBirth,
        gender: obj.gender,
        houseName: obj.houseName,
        city: obj.city,
        state: obj.state,
        country: obj.country,
        pin: obj.pin,
    };
}
function mapGetProfileDoctorProfileDTO(profile) {
    if (!profile)
        return null;
    const obj = profile.toObject();
    return {
        id: obj._id.toString(),
        educationDetails: obj.educationDetails,
        specialization: obj.specialization,
        registrationNumber: obj.registrationNumber,
        registrationYear: obj.registrationYear,
        yearOfExperience: obj.yearOfExperience,
        signature: obj.signature,
        proofDocuments: obj.proofDocuments,
        fee: obj.fee,
        about: obj.about,
        averageRating: obj.averageRating,
        ratingCount: obj.ratingCount,
        availability: obj.availability,
        slotDuration: obj.slotDuration,
    };
}
