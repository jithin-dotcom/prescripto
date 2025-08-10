

export interface ITopDoctor {
  _id: string;
  doctorId: {
    _id: string;
    name: string;
    email: string;
    role: string;
    isVerified: boolean;
    authProvider: string;
    isBlocked: boolean;
    createdAt: string;
    photo?: string;
  };
  educationDetails: string;
  specialization: string;
  registrationNumber: string;
  registrationYear: string;
  yearOfExperience: number;
  proofDocuments: string[];
  fee: number;
  about: string;
  createdAt: string;
  averageRating?: number;
  ratingCount?: number;
  availability?: {
    day: string;
    slots: { from: string; to: string }[];
  }[];
  slotDuration?: number;
}