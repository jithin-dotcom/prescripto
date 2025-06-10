
import mongoose, { Schema } from "mongoose";
import { IPatientProfile } from "./IPatientProfile";

const PatientProfileSchema = new Schema<IPatientProfile>(
    {
        patientId: {type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        dateOfBirth: {type: String, required: true},
        gender: {type: String, enum: ["male","female","other"], required: true},
        houseName: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        country: {type: String, required: true},
        pin: {type: Number, required: true},
        
    },
    {timestamps: true}
)

export const PatientProfileModel = mongoose.model("PatientProfile",PatientProfileSchema);