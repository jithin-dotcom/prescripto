"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAppointmentDTO = toAppointmentDTO;
exports.toAppointmentEntity = toAppointmentEntity;
const mongoose_1 = __importDefault(require("mongoose"));
function toAppointmentDTO(doc) {
    const obj = doc.toObject();
    return {
        id: obj._id.toString(),
        userId: obj.userId.toString(),
        doctorId: obj.doctorId.toString(),
        day: obj.day,
        time: obj.time,
        fee: obj.fee,
        appointmentNo: obj.appointmentNo,
        status: obj.status,
        payment: obj.payment,
        method: obj.method,
        createdAt: obj.createdAt,
        updatedAt: obj.updatedAt,
    };
}
function toAppointmentEntity(data) {
    return {
        userId: new mongoose_1.default.Types.ObjectId(data.userId),
        doctorId: new mongoose_1.default.Types.ObjectId(data.doctorId),
        transactionId: data.transactionId ? new mongoose_1.default.Types.ObjectId(data.transactionId) : undefined,
        day: data.day,
        time: data.time,
        fee: data.fee,
        appointmentNo: data.appointmentNo,
        status: "pending",
        payment: "not paid",
    };
}
