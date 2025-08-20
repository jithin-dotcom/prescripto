

import { IBaseRepository } from "./IBaseRepository";
import { IAppointment } from "../../models/appointment/IAppointment";
import mongoose from "mongoose";

export interface IAppointmentRepository extends IBaseRepository<IAppointment>{
   
    findDoctor(doctorId: mongoose.Types.ObjectId): Promise<IAppointment[]>; 
    countAllFiltered(filter: {userId: mongoose.Types.ObjectId, status?: string} | {doctorId: mongoose.Types.ObjectId, status?: string} | {status?: string}): Promise<number>;
    findAllPopulatedPaginatedFiltered(
      skip: number,
      limit: number,
      filter: {status?:string}
     ): Promise<IAppointment[]>;
    findDoctorFilteredPaginated(
      skip: number,
      limit: number,
      filter: {status?: string, doctorId: mongoose.Types.ObjectId}
     ): Promise<IAppointment[]>

    findUserFilteredPaginated(
       skip: number,
       limit: number,
       filter: {userId: mongoose.Types.ObjectId, status?: string}
     ): Promise<IAppointment[]>

     updatePaymentStatus(appointmentId: string, status: "paid" | "not paid", transactionId: mongoose.Types.ObjectId): Promise<void>;
     cancelWithRefundIfPaid(id: string): Promise<boolean>;
}