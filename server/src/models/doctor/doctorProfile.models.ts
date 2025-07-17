

// import mongoose, { Schema } from "mongoose";
// import { IDoctorProfile } from "./IDoctorProfile";

// const AvailabilitySlotSchema = new Schema(
//   {
//     day: { type: String, required: true }, 
//     from: { type: String, required: true }, 
//     to: { type: String, required: true },   
//   },
//   { _id: false } 
// );

// const DoctorProfileSchema = new Schema<IDoctorProfile>(
//   {
//     doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
//     educationDetails: { type: String, required: true },
//     specialization: { type: String, required: true },
//     registrationNumber: { type: String, required: true },
//     registrationYear: { type: String, required: true },
//     yearOfExperience: { type: Number, required: true },
//     proofDocuments: [{ type: String }],
//     fee: { type: Number, required: true },
//     about: { type: String, required: true },
//     availability: {
//       type: [AvailabilitySlotSchema],
//       default: [], 
//     },
//     slotDuration: {
//       type: Number,
//       default: 30,
//     },
//   },
//   { timestamps: true }
// );

// export const DoctorProfileModel = mongoose.model("DoctorProfile", DoctorProfileSchema);







import mongoose, { Schema } from "mongoose";
import { IDoctorProfile } from "./IDoctorProfile";

// Each time block for a day (e.g., 9:00–12:00, 3:00–6:00)
const TimeBlockSchema = new Schema(
  {
    from: { type: String, required: true }, // e.g., "09:00 AM"
    to: { type: String, required: true },   // e.g., "02:00 PM"
  },
  { _id: false }
);

// Each day can have multiple time blocks
const AvailabilitySlotSchema = new Schema(
  {
    day: {
      type: String,
      required: true,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    },
    slots: {
      type: [TimeBlockSchema], // optional, can be empty or multiple blocks
      default: [],
    },
  },
  { _id: false }
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
    availability: {
      type: [AvailabilitySlotSchema],
      default: [], // doctor can have 0 or more days
    },
    slotDuration: {
      type: Number,
      default: 30,
    },
  },
  { timestamps: true }
);

export const DoctorProfileModel = mongoose.model("DoctorProfile", DoctorProfileSchema);
