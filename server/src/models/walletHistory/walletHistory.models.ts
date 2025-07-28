import mongoose,{ Schema} from "mongoose";
import { IWalletHistory } from "./IWalletHistory";

const WalletHistorySchema = new Schema<IWalletHistory>(
    {
        walletId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Wallet",
            required: true,
        },
        appointmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
            required: true,
        },
        transactionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
        },
        amount: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            enum: ["credit","debit"],
            required: true,
        },
        source: {
            type: String,
            enum: ["refund", "consultation", "admin_adjustment"],
            required: true,
        },
        status: {
            type: String,
            enum: ["success", "pending", "failed"],
            default: "success",
            required: true,
        },

    },
    {timestamps: true},
)

export const WalletHistoryModel = mongoose.model("WalletHistory", WalletHistorySchema);