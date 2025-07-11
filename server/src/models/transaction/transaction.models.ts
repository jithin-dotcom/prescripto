
import { ITransaction } from "./ITransaction";
import mongoose, {Schema} from "mongoose";


const transaction = new Schema<ITransaction>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        transactionId: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending","success","failed","cancelled"],
            default: "pending",
        },
        method: {
            type: String,
            required: true,
        },
    },
    {timestamps: true},
);

export const TransactionModel = mongoose.model("Transaction",transaction);