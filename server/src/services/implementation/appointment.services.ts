import { IAppointment } from "../../models/appointment/IAppointment";
import { IAppointmentRepository } from "../../repositories/interface/IAppointmentRepository";
import { IAppointmentService, IAppointmentResponse } from "../interface/IAppointmentService";
import mongoose from "mongoose";
import { IDoctorProfileRepository } from "../../repositories/interface/IDoctorProfileRepository";
import { IAppointmentWithUserResponse } from "../interface/IAppointmentService";
import { IPatientProfileRepository } from "../../repositories/interface/IPatientProfileRepository";

// function mapToAppointmentResponse(appointment: IAppointment): IAppointmentResponse {
//   return {
//     _id: (appointment._id as mongoose.Types.ObjectId).toString(),
//     doctorId: appointment.doctorId.toString(),
//     userId: appointment.userId.toString(),
//     date: appointment.date,
//     time: appointment.time,
//     status: appointment.status,
//     transactionId: appointment.transactionId?.toString(),
//   };
// }

// function mapToAppointmentResponse(appointment: IAppointment): IAppointmentResponse {
//   const doctor = appointment.doctorId as any;

//   return {
//     _id: (appointment._id as mongoose.Types.ObjectId).toString(),
//     doctor: {
//       _id: doctor._id.toString(),
//       name: doctor.name,
//       email: doctor.email,
//       photo: doctor.photo,
//     },
//     userId: appointment.userId.toString(),
//     date: appointment.date,
//     time: appointment.time,
//     status: appointment.status,
//     transactionId: appointment.transactionId?.toString(),
//   };
// }

export class AppointmentService implements IAppointmentService {
  constructor(
    private  _appointmentRepo: IAppointmentRepository,
    private _DoctorRepo : IDoctorProfileRepository,
    private _PatientRepo: IPatientProfileRepository,
  ) {}

  // async createAppointment(data: Partial<IAppointment>): Promise<IAppointmentResponse> {
  //   if (!data.userId || !data.doctorId || !data.date || !data.time) {
  //     throw new Error("Missing required fields");
  //   }

  //   const appointmentData = {
  //     ...data,
  //     userId: new mongoose.Types.ObjectId(data.userId),
  //     doctorId: new mongoose.Types.ObjectId(data.doctorId),
  //     status: "pending" as "pending", 
  //   };

  //   const created = await this._appointmentRepo.create(appointmentData);
  //   return mapToAppointmentResponse(created);
     
  // }



    async createAppointment(data: Partial<IAppointment>): Promise<{message:string}> {
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
    return {
       message: "successfully created"
    }
     
  }

  // async getAppointmentsByUser(userId: string): Promise<IAppointmentResponse[]> {
  //   const appointments = await this._appointmentRepo.findByUserId(new mongoose.Types.ObjectId(userId));
  //   return appointments.map(mapToAppointmentResponse);
  // }


  async getAppointmentsByUser(userId: string): Promise<IAppointmentResponse[]> {
  const appointments = await this._appointmentRepo.findByUserId(
    new mongoose.Types.ObjectId(userId)
  );

  const responses: IAppointmentResponse[] = [];

  for (const appointment of appointments) {
    const doctorUser = appointment.doctorId as any;

    // Fetch profile using doctor's user _id
    const profile = await this._DoctorRepo.findOne({
      doctorId: doctorUser._id,
    });

    if(!profile){
       throw new Error("Profile not found");
    }

    responses.push({
      _id: (appointment._id as mongoose.Types.ObjectId).toString(),
      doctor: {
        _id: doctorUser._id.toString(),
        name: doctorUser.name,
        email: doctorUser.email,
        photo: doctorUser.photo,
        isVerified: doctorUser.isVerified,
        educationDetails: profile?.educationDetails,
        isBlocked: doctorUser.isBlocked,
        specialization: profile?.specialization || "",
        yearOfExperience: profile?.yearOfExperience || 0,
        fee: profile?.fee || 0,
      },
      userId: appointment.userId.toString(),
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
      transactionId: appointment.transactionId?.toString(),
    });
  }

  return responses;
}





async getAppointmentsByDoctor(
  doctorId: string
): Promise<IAppointmentWithUserResponse[]> {
  const appointments = await this._appointmentRepo.findByDoctorId(
    new mongoose.Types.ObjectId(doctorId)
  );

  const responses: IAppointmentWithUserResponse[] = [];

  for (const appointment of appointments) {
    const user = appointment.userId as any;

    if (!user || !user._id) continue;

    const patientProfile = await this._PatientRepo.findOne({
      patientId: user._id,
    });

    responses.push({
      _id: (appointment._id as mongoose.Types.ObjectId).toString(),
      doctorId: appointment.doctorId.toString(),
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        photo: user.photo,
        isVerified: user.isVerified,
        isBlocked: user.isBlocked,
        dateOfBirth: patientProfile?.dateOfBirth,
        gender: patientProfile?.gender,
        houseName: patientProfile?.houseName,
        city: patientProfile?.city,
        state: patientProfile?.state,
        country: patientProfile?.country,
        pin: patientProfile?.pin,
        // profilePhoto: patientProfile?.profilePhoto,
      },
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
      transactionId: appointment.transactionId?.toString(),
    });
  }

  return responses;
}






  // async getAppointmentsByDoctor(doctorId: string): Promise<IAppointmentResponse[]> {
  //   const appointments = await this._appointmentRepo.findByDoctorId(new mongoose.Types.ObjectId(doctorId));
  //   return appointments.map(mapToAppointmentResponse);
  // }

//   async cancelAppointment(id: string): Promise<void> {
//     const existing = await this._appointmentRepo.findById(new mongoose.Types.ObjectId(id));
//     if (!existing) {
//       throw new Error("Appointment not found");
//     }

//     await this._appointmentRepo.updateById(existing._id  as mongoose.Types.ObjectId, { status: "cancelled" });
//   }
}
