
import { IConcernPopulated } from "../../services/interface/IConcernService";
import { IConcernDocPopulated } from "../../models/concern/IConcern";

export function mapConcernsClean(data: IConcernDocPopulated[]): IConcernPopulated[] {
  return data.map(concern => ({
    _id: concern._id.toString(),
    appointmentId: {
      _id: concern.appointmentId._id.toString(),
      userId: concern.appointmentId.userId.toString(),
      doctorId: concern.appointmentId.doctorId.toString(),
      appointmentNo: concern.appointmentId.appointmentNo,
      day: concern.appointmentId.day,
      time: concern.appointmentId.time,
      status: concern.appointmentId.status,
      fee: concern.appointmentId.fee,
      payment: concern.appointmentId.payment,
      createdAt: concern.appointmentId.createdAt.toISOString(),
      updatedAt: concern.appointmentId.updatedAt.toISOString()
    },
    userId: {
      _id: concern.userId._id.toString(),
      name: concern.userId.name,
      email: concern.userId.email,
      role: concern.userId.role,
      isVerified: concern.userId.isVerified,
      authProvider: concern.userId.authProvider,
      isBlocked: concern.userId.isBlocked,
      createdAt: concern.userId.createdAt.toISOString(),
      updatedAt: concern.userId.updatedAt.toISOString(),
      photo: concern.userId.photo
    },
    doctorName: concern.doctorName??"",
    doctorId: {
      _id: concern.doctorId._id.toString(),
      name: concern.doctorId.name,
      email: concern.doctorId.email,
      role: concern.doctorId.role,
      isVerified: concern.doctorId.isVerified,
      authProvider: concern.doctorId.authProvider,
      isBlocked: concern.doctorId.isBlocked,
      createdAt: concern.doctorId.createdAt.toISOString(),
      updatedAt: concern.doctorId.updatedAt.toISOString(),
      photo: concern.doctorId.photo
    },
    title: concern.title,
    description: concern.description,
    status: concern.status,
    reason: concern.reason,
    createdAt: concern.createdAt.toISOString(),
    updatedAt: concern.updatedAt.toISOString()
  }));
}
