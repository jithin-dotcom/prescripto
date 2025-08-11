

import { IAppointment } from "../../models/appointment/IAppointment";
import { IDoctorUser, IAppointmentResponse } from "../../services/interface/IAppointmentService";
import { IDoctorProfile } from "../../models/doctor/IDoctorProfile";
import mongoose from "mongoose";

export function mapAppointmentToDTO(
  appointment: IAppointment,
  doctorUser: IDoctorUser,
  profile: IDoctorProfile
): IAppointmentResponse {
  return {
    _id: (appointment._id as mongoose.Types.ObjectId).toString(),
    doctor: {
      _id: doctorUser._id.toString(),
      name: doctorUser.name,
      email: doctorUser.email,
      photo: doctorUser.photo,
      isVerified: doctorUser.isVerified,
      isBlocked: doctorUser.isBlocked,
      educationDetails: profile.educationDetails,
      averageRating: profile.averageRating || 0,
      ratingCount: profile.ratingCount || 0,
      specialization: profile.specialization || "",
      yearOfExperience: profile.yearOfExperience || 0,
      fee: profile.fee || 0,
    },
    userId: appointment.userId.toString(),
    date: appointment.day,
    time: appointment.time,
    status: appointment.status,
    appointmentNo: appointment.appointmentNo || 0,
    transactionId: appointment.transactionId?.toString(),
    payment: appointment.payment,
  };
}


