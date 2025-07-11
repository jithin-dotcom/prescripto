import { IAppointment } from "../../models/appointment/IAppointment";
import { IAppointmentRepository } from "../../repositories/interface/IAppointmentRepository";
import { IAppointmentService, IAppointmentResponse } from "../interface/IAppointmentService";
import mongoose from "mongoose";


function mapToAppointmentResponse(appointment: IAppointment): IAppointmentResponse {
  return {
    _id: (appointment._id as mongoose.Types.ObjectId).toString(),
    doctorId: appointment.doctorId.toString(),
    userId: appointment.userId.toString(),
    date: appointment.date,
    time: appointment.time,
    status: appointment.status,
    transactionId: appointment.transactionId?.toString(),
  };
}

export class AppointmentService implements IAppointmentService {
  constructor(private readonly _appointmentRepo: IAppointmentRepository) {}

  async createAppointment(data: Partial<IAppointment>): Promise<IAppointmentResponse> {
    if (!data.userId || !data.doctorId || !data.date || !data.time) {
      throw new Error("Missing required fields");
    }

    const appointmentData = {
      ...data,
      userId: new mongoose.Types.ObjectId(data.userId),
      doctorId: new mongoose.Types.ObjectId(data.doctorId),
      status: "pending" as "pending", 
    };

    const created = await this._appointmentRepo.create(appointmentData);
    return mapToAppointmentResponse(created);
  }

//   async getAppointmentsByUser(userId: string): Promise<IAppointmentResponse[]> {
//     const appointments = await this._appointmentRepo.findByUserId(new mongoose.Types.ObjectId(userId));
//     return appointments.map(mapToAppointmentResponse);
//   }

//   async getAppointmentsByDoctor(doctorId: string): Promise<IAppointmentResponse[]> {
//     const appointments = await this._appointmentRepo.findByDoctorId(new mongoose.Types.ObjectId(doctorId));
//     return appointments.map(mapToAppointmentResponse);
//   }

//   async cancelAppointment(id: string): Promise<void> {
//     const existing = await this._appointmentRepo.findById(new mongoose.Types.ObjectId(id));
//     if (!existing) {
//       throw new Error("Appointment not found");
//     }

//     await this._appointmentRepo.updateById(existing._id  as mongoose.Types.ObjectId, { status: "cancelled" });
//   }
}
