"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCreateDoctorProfileDTOToEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mapCreateDoctorProfileDTOToEntity = (doctorId, dto) => {
    return {
        doctorId: new mongoose_1.default.Types.ObjectId(doctorId),
        educationDetails: dto.educationDetails,
        specialization: dto.specialization,
        registrationNumber: dto.registrationNumber,
        registrationYear: dto.registrationYear,
        yearOfExperience: dto.yearOfExperience,
        signature: dto.signature,
        proofDocuments: dto.proofDocuments,
        fee: dto.fee,
        about: dto.about,
        availability: dto.availability,
        slotDuration: dto.slotDuration,
    };
};
exports.mapCreateDoctorProfileDTOToEntity = mapCreateDoctorProfileDTOToEntity;
