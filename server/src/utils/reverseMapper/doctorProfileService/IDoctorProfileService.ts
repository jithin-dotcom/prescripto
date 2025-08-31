


export interface CreateDoctorProfileDTO {
  educationDetails: string;
  specialization: string;
  registrationNumber: string;
  registrationYear: string;
  yearOfExperience: number;
  signature?: string;
  proofDocuments: string[];
  fee: number;
  about: string;
  availability?: {
    day: string;
    slots: { from: string; to: string }[];
  }[];
  slotDuration?: number;
}
