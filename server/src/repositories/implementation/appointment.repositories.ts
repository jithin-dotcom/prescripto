
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
      return AppointmentModel.find({ userId }).populate("doctorId").sort({createdAt: -1}).exec();
    }

    async findDoctor(doctorId: mongoose.Types.ObjectId): Promise<IAppointment[]> {
      return AppointmentModel.find({ doctorId }).populate("doctorId").exec();
    }

    async findByDoctorId(doctorId: mongoose.Types.ObjectId): Promise<IAppointment[]> {
      return AppointmentModel.find({ doctorId }).populate("userId").sort({createdAt: -1}).exec();
    }

    async findAllPopulated(): Promise<IAppointment[]> {
      return this.model
        .find()
        .populate("doctorId", "name email photo isVerified isBlocked")
        .populate("userId", "name email photo isVerified isBlocked")
        .sort({createdAt: -1})
        .exec();
    }

    async countAll(): Promise<number> {
      return this.model.countDocuments();
    }

    async findAllPopulatedPaginated(skip: number, limit: number ): Promise<IAppointment[]> {
      return this.model.find()
       .populate("doctorId")
       .populate("userId")
       .skip(skip)
       .limit(limit)
       .sort({ createdAt: -1 }); 
}

async countAllFiltered(filter: any): Promise<number> {
  return this.model.countDocuments(filter);
}

async findAllPopulatedPaginatedFiltered(
  skip: number,
  limit: number,
  filter: any
): Promise<IAppointment[]> {
  return this.model
    .find(filter)
    .populate("doctorId")
    .populate("userId")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
}

async findDoctorFilteredPaginated(
  skip: number,
  limit: number,
  filter: any
): Promise<IAppointment[]> {
  return AppointmentModel.find(filter)
    .populate("userId")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .exec();
}


async findUserFilteredPaginated(
  skip: number,
  limit: number,
  filter: any
): Promise<IAppointment[]> {
  return this.model
    .find(filter)
    .populate("doctorId")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
}


}