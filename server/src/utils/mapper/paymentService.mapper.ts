

import { IPayoutDocPopulated, IPayoutClean } from "../../services/interface/IPaymentService";

export function mapPayouts(data: IPayoutDocPopulated[]): IPayoutClean[] {
  return data.map((payout) => ({
    _id: payout._id.toString(),
    doctorId: {
      _id: payout.doctorId._id.toString(),
      name: payout.doctorId.name,
      email: payout.doctorId.email,
      role: payout.doctorId.role,
      isVerified: payout.doctorId.isVerified,
      authProvider: payout.doctorId.authProvider,
      isBlocked: payout.doctorId.isBlocked,
      createdAt: payout.doctorId.createdAt.toISOString(),
      photo: payout.doctorId.photo
    },
    amount: payout.amount,
    status: payout.status,
    reason: payout.reason,
    requestedAt: payout.requestedAt.toISOString(),
    createdAt: payout.createdAt.toISOString()
  }));
}
