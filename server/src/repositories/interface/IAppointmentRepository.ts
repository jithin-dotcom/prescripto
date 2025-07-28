

import { IBaseRepository } from "./IBaseRepository";
import { IAppointment } from "../../models/appointment/IAppointment";
import mongoose from "mongoose";

export interface IAppointmentRepository extends IBaseRepository<IAppointment>{
   
    findDoctor(doctorId: mongoose.Types.ObjectId): Promise<IAppointment[]>; 
    countAllFiltered(filter: any): Promise<number>;
    findAllPopulatedPaginatedFiltered(
      skip: number,
      limit: number,
      filter: any
     ): Promise<IAppointment[]>;
    findDoctorFilteredPaginated(
      skip: number,
      limit: number,
      filter: any
     ): Promise<IAppointment[]>

    findUserFilteredPaginated(
       skip: number,
       limit: number,
       filter: any
     ): Promise<IAppointment[]>

     updatePaymentStatus(appointmentId: string, status: "paid" | "not paid", transactionId: mongoose.Types.ObjectId): Promise<void>;
     cancelWithRefundIfPaid(id: string): Promise<boolean>;
}