"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCreateConcernToEntity = void 0;
const mapCreateConcernToEntity = (dto) => ({
    appointmentId: dto.appointmentId,
    doctorId: dto.doctorId,
    userId: dto.userId,
    doctorName: dto.doctorName,
    title: dto.title,
    description: dto.description,
    status: "pending",
});
exports.mapCreateConcernToEntity = mapCreateConcernToEntity;
