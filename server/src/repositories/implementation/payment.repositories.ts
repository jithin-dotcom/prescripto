


import { IPayment } from "../../models/payment/IPayment";
import { Payment } from "../../models/payment/payment.models";
import { BaseRepository } from "../implementation/base.repositories";
import { IPaymentRepository } from "../interface/IPaymentRepository";


export class PaymentRepository
  extends BaseRepository<IPayment>
  implements IPaymentRepository
{
  constructor() {
    super(Payment); 
  }

  async findByRazorpayOrderId(orderId: string): Promise<IPayment | null> {
    return await this.model.findOne({ razorpayOrderId: orderId });
  }

  async getPaymentInfo(appointmentId: string): Promise<IPayment | null> {
    return await this.model.findOne({appointmentId}).populate("appointmentId doctorId");
  }
  
}
