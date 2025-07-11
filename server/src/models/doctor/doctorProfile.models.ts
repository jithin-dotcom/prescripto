
// import mongoose, { Schema } from "mongoose";
// import { IDoctorProfile } from "./IDoctorProfile";

// const DoctorProfileSchema = new Schema<IDoctorProfile>(
//     {
//         doctorId: {type: Schema.Types.ObjectId, ref: "User", required: true, unique: true},
//         educationDetails: {type: String, required: true},
//         specialization: {type: String, required: true},
//         registrationNumber: {type: String, required: true},
//         registrationYear: {type: String, required: true},
//         yearOfExperience: {type: Number, required: true},
//         proofDocuments: [{type: String}],
//         fee: {type: Number,required: true},
//         about: {type: String, required: true},
        
//     },
//     {timestamps: true}
// )

// export const DoctorProfileModel = mongoose.model("DoctorProfile",DoctorProfileSchema);






import mongoose, { Schema } from "mongoose";
import { IDoctorProfile } from "./IDoctorProfile";

const AvailabilitySlotSchema = new Schema(
  {
    day: { type: String, required: true }, // e.g., "Monday"
    from: { type: String, required: true }, // e.g., "09:00"
    to: { type: String, required: true },   // e.g., "17:00"
  },
  { _id: false } // prevents creating unnecessary _id fields in array items
);

const DoctorProfileSchema = new Schema<IDoctorProfile>(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    educationDetails: { type: String, required: true },
    specialization: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    registrationYear: { type: String, required: true },
    yearOfExperience: { type: Number, required: true },
    proofDocuments: [{ type: String }],
    fee: { type: Number, required: true },
    about: { type: String, required: true },

    // ✅ New fields for dynamic slots
    availability: {
      type: [AvailabilitySlotSchema],
      default: [], // ensures no breakage for existing documents
    },
    slotDuration: {
      type: Number,
      default: 30, // in minutes
    },
  },
  { timestamps: true }
);

export const DoctorProfileModel = mongoose.model("DoctorProfile", DoctorProfileSchema);
