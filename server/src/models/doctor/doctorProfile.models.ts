
import mongoose, { Schema } from "mongoose";
import { IDoctorProfile } from "./IDoctorProfile";

const DoctorProfileSchema = new Schema<IDoctorProfile>(
    {
        doctorId: {type: Schema.Types.ObjectId, ref: "User", required: true, unique: true},
        educationDetails: {type: String, required: true},
        specialization: {type: String, required: true},
        registrationNumber: {type: String, required: true},
        registrationYear: {type: String, required: true},
        yearOfExperience: {type: Number, required: true},
        proofDocuments: [{type: String}],
        fee: {type: Number,required: true},
        about: {type: String, required: true},
        
    },
    {timestamps: true}
)

export const DoctorProfileModel = mongoose.model("DoctorProfile",DoctorProfileSchema);