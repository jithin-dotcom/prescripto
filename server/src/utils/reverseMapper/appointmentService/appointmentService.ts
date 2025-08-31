

import mongoose from "mongoose";
import { IAppointment } from "../../../models/appointment/IAppointment";
import { AppointmentDTO, CreateAppointmentDTO } from "./IAppointmentService";

export function toAppointmentDTO(doc: IAppointment): AppointmentDTO {
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

export function toAppointmentEntity(data: CreateAppointmentDTO & { fee?: number; appointmentNo: number }): Partial<IAppointment> {
  return {
    userId: new mongoose.Types.ObjectId(data.userId),
    doctorId: new mongoose.Types.ObjectId(data.doctorId),
    transactionId: data.transactionId ? new mongoose.Types.ObjectId(data.transactionId) : undefined,
    day: data.day,
    time: data.time,
    fee: data.fee,
    appointmentNo: data.appointmentNo,
    status: "pending",
    payment: "not paid",
  };
}
