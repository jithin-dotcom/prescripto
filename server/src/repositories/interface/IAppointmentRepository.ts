

import { IBaseRepository } from "./IBaseRepository";
import { IAppointment } from "../../models/appointment/IAppointment";
import mongoose from "mongoose";

export interface IAppointmentRepository extends IBaseRepository<IAppointment>{
    findByUserId(userId: mongoose.Types.ObjectId): Promise<IAppointment[]>;
    findByDoctorId(doctorId: mongoose.Types.ObjectId): Promise<IAppointment[]>;
    findAllPopulated(): Promise<IAppointment[]>;
    findDoctor(doctorId: mongoose.Types.ObjectId): Promise<IAppointment[]>;
    findAllPopulatedPaginated(skip: number, limit: number): Promise<IAppointment[]>;
    countAll(): Promise<number>;
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
}