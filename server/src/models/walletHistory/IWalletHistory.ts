

import mongoose,{ Document} from "mongoose";

export interface IWalletHistory extends Document {
  walletId: mongoose.Types.ObjectId;
  appointmentId: mongoose.Types.ObjectId;
//   paymentId: mongoose.Types.ObjectId;
  amount: number;
  type: 'credit' | 'debit';
  source: 'refund' | 'consultation' | 'admin_adjustment';
  status: 'success' | 'pending' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}