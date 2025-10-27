"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPartialPrescriptionDTO = exports.mapPrescriptionDTO = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mapPrescriptionDTO = (dto) => {
    return {
        appointmentId: new mongoose_1.default.Types.ObjectId(dto.appointmentId),
        doctorId: new mongoose_1.default.Types.ObjectId(dto.doctorId),
        patientId: new mongoose_1.default.Types.ObjectId(dto.patientId),
        diagnosis: dto.diagnosis,
        notes: dto.notes,
        medicines: dto.medicines,
        followUpDate: dto.followUpDate ? new Date(dto.followUpDate) : undefined,
    };
};
exports.mapPrescriptionDTO = mapPrescriptionDTO;
const mapPartialPrescriptionDTO = (dto) => {
    const mapped = {};
    if (dto.appointmentId)
        mapped.appointmentId = new mongoose_1.default.Types.ObjectId(dto.appointmentId);
    if (dto.doctorId)
        mapped.doctorId = new mongoose_1.default.Types.ObjectId(dto.doctorId);
    if (dto.patientId)
        mapped.patientId = new mongoose_1.default.Types.ObjectId(dto.patientId);
    if (dto.diagnosis)
        mapped.diagnosis = dto.diagnosis;
    if (dto.notes)
        mapped.notes = dto.notes;
    if (dto.medicines)
        mapped.medicines = dto.medicines;
    if (dto.followUpDate)
        mapped.followUpDate = new Date(dto.followUpDate);
    return mapped;
};
exports.mapPartialPrescriptionDTO = mapPartialPrescriptionDTO;
