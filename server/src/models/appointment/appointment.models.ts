
import { IAppointment } from "./IAppointment";
import mongoose,{Schema} from "mongoose";


const appointmentSchema = new Schema<IAppointment>(
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
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction",
            required: false,
        },
        appointmentNo: {
            type: Number,
            required: true,
        },
        day: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending","confirmed","cancelled","completed"],
            default: "pending",
        },
        fee: {
            type: Number,
            required: false,
        }
    },
    {timestamps: true},

);

export const AppointmentModel = mongoose.model<IAppointment>("Appointment",appointmentSchema);