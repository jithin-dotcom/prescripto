
import mongoose from "mongoose";
import { BaseRepository } from "./base.repositories";
import { IAppointment } from "../../models/appointment/IAppointment";
import { IAppointmentRepository } from "../interface/IAppointmentRepository";
import { AppointmentModel } from "../../models/appointment/appointment.models";


export class AppointmentRepository extends BaseRepository<IAppointment> implements IAppointmentRepository {
    constructor(){
        super(AppointmentModel);
    }

    async findDoctor(doctorId: mongoose.Types.ObjectId): Promise<IAppointment[]> {
      return AppointmentModel.find({ doctorId }).populate("doctorId").exec();
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


   async updatePaymentStatus(appointmentId: string, status: "paid" | "not paid"): Promise<void> {
     await AppointmentModel.findByIdAndUpdate(appointmentId, { payment: status });
   }

   async cancelWithRefundIfPaid(id: string): Promise<boolean> {
  const res = await this.model.updateOne(
    { _id: id },
    [
      {
        $set: {
          status: "cancelled",
          payment: {
            $cond: [{ $eq: ["$payment", "paid"] }, "refund", "$payment"],
          },
        },
      },
    ]
  );
  return res.modifiedCount > 0;
}

}