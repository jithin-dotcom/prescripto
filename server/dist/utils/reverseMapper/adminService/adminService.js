"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserToDTOResponse = exports.mapCreateUserDtoToDb = exports.mapDoctorProfileDtoToDb = exports.mapPatientProfileDtoToDb = exports.mapUserDtoToDb = void 0;
const mapUserDtoToDb = (dto) => ({
    name: dto.name,
    email: dto.email,
    password: dto.password,
    photo: dto.photo,
    signature: dto.signature
});
exports.mapUserDtoToDb = mapUserDtoToDb;
const mapPatientProfileDtoToDb = (dto) => (Object.assign({}, dto));
exports.mapPatientProfileDtoToDb = mapPatientProfileDtoToDb;
const mapDoctorProfileDtoToDb = (dto) => (Object.assign({}, dto));
exports.mapDoctorProfileDtoToDb = mapDoctorProfileDtoToDb;
const mapCreateUserDtoToDb = (dto) => ({
    name: dto.name,
    email: dto.email,
    password: dto.password,
    role: dto.role,
    photo: dto.photo,
    signature: dto.signature,
});
exports.mapCreateUserDtoToDb = mapCreateUserDtoToDb;
const mapUserToDTOResponse = (user, profile) => ({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
    isBlocked: user.isBlocked,
    authProvider: user.authProvider,
    photo: user.photo,
    signature: user.signature,
    profile: profile ? profile.map((p) => mapProfileToDTO(user.role, p)) : null,
});
exports.mapUserToDTOResponse = mapUserToDTOResponse;
const mapProfileToDTO = (role, profile) => {
    if (role === "doctor") {
        return {
            educationDetails: profile.educationDetails,
            specialization: profile.specialization,
            registrationNumber: profile.registrationNumber,
            registrationYear: profile.registrationYear,
            yearOfExperience: profile.yearOfExperience,
            signature: profile.signature,
            proofDocuments: profile.proofDocuments,
            fee: profile.fee,
            about: profile.about,
            availability: profile.availability,
            slotDuration: profile.slotDuration,
        };
    }
    else {
        return {
            dateOfBirth: profile.dateOfBirth,
            gender: profile.gender,
            houseName: profile.houseName,
            city: profile.city,
            state: profile.state,
            country: profile.country,
            pin: profile.pin,
        };
    }
};
