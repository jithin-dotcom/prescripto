
import mongoose,{ Schema} from "mongoose";
import { IWallet } from "./IWallet";



const WalletSchema = new Schema<IWallet>(
 {
    userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
    },
    role: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
    }
 },
 {timestamps: true},
)

export const WalletModel = mongoose.model("Wallet",WalletSchema);