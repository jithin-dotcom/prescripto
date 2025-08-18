
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
            ref: "Payment",
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
        },
        payment:{
            type: String,
            enum: ["paid","not paid","refund"],
            default: "not paid"
        },
        method: {
            type: String,
        }
    },
    {timestamps: true},

);

export const AppointmentModel = mongoose.model<IAppointment>("Appointment",appointmentSchema);