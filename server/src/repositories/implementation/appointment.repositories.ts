
import mongoose from "mongoose";
import { BaseRepository } from "./base.repositories";
import { IAppointment } from "../../models/appointment/IAppointment";
import { IAppointmentRepository } from "../interface/IAppointmentRepository";
import { AppointmentModel } from "../../models/appointment/appointment.models";


export class AppointmentRepository extends BaseRepository<IAppointment> implements IAppointmentRepository {
    constructor(){
        super(AppointmentModel);
    }

     async findByUserId(userId: mongoose.Types.ObjectId): Promise<IAppointment[]> {
      return AppointmentModel.find({ userId }).populate("doctorId").exec();
    }

    async findByDoctorId(doctorId: mongoose.Types.ObjectId): Promise<IAppointment[]> {
      return AppointmentModel.find({ doctorId }).populate("userId").exec();
    }

}