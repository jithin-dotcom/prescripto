

import { IBaseRepository } from "./IBaseRepository";
import { IAppointment } from "../../models/appointment/IAppointment";
import mongoose from "mongoose";

export interface IAppointmentRepository extends IBaseRepository<IAppointment>{
    findByUserId(userId: mongoose.Types.ObjectId): Promise<IAppointment[]>;
    findByDoctorId(doctorId: mongoose.Types.ObjectId): Promise<IAppointment[]>;
}