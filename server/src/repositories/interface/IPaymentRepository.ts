import { IPayment } from "../../models/payment/IPayment";
import mongoose from "mongoose";

export interface IPaymentRepository {
  create(payment: Partial<IPayment>): Promise<IPayment>;
  findById(id: string | mongoose.Types.ObjectId): Promise<IPayment | null>;
  findByRazorpayOrderId(orderId: string): Promise<IPayment | null>;
  updateById(
    id: string | mongoose.Types.ObjectId,
    update: Partial<IPayment>
  ): Promise<IPayment | null>;
  findAll(filter?: Partial<IPayment>): Promise<IPayment[]>;
  
  deleteById(id: string | mongoose.Types.ObjectId): Promise<void>;
  deleteByFilter(filter: Partial<IPayment>): Promise<void>;
  getPaymentInfo(appointmentId: string): Promise<IPayment | null>;
}
