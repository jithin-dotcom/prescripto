

import mongoose, { Document} from "mongoose";

export interface IPayout extends Document {
    doctorId: mongoose.Types.ObjectId;
    amount: number;
    status: "pending" | "approved" | "rejected" | "processed" | "failed";
    requestedAt: Date;
    approvedAt?: Date;
    payoutId?: Date;
    reason?: string;
    decentroTxnId?: string;
}