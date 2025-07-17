
// import mongoose, { Document } from "mongoose";

// export interface IAvailabilitySlot {
//     day: string;
//     from: string;
//     to: string;
// }

// export interface IDoctorProfile extends Document {
//     doctorId: mongoose.Types.ObjectId;
//     educationDetails: string;
//     specialization: string;
//     registrationNumber: string;
//     registrationYear: string;
//     yearOfExperience: number;
//     proofDocuments: string[];
//     fee: number;
//     about: string;
//     createdAt: Date;
//     updatedAt: Date;

//     availability?: IAvailabilitySlot[];
//     slotDuration?: number;
// }





import mongoose, { Document } from "mongoose";

// A single time range in a day
export interface ITimeBlock {
  from: string;
  to: string;
}

// Availability for a day with multiple time blocks
export interface IAvailabilitySlot {
  day: string;
  slots: ITimeBlock[]; // replaces from/to directly on IAvailabilitySlot
}

export interface IDoctorProfile extends Document {
  doctorId: mongoose.Types.ObjectId;
  educationDetails: string;
  specialization: string;
  registrationNumber: string;
  registrationYear: string;
  yearOfExperience: number;
  proofDocuments: string[];
  fee: number;
  about: string;
  createdAt: Date;
  updatedAt: Date;

  availability?: IAvailabilitySlot[];
  slotDuration?: number;
}
