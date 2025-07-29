

export interface DoctorProfile {
  specialization?: string;
  averageRating?: number;
  ratingCount?: number;
}

export interface Doctor {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  isVerified: boolean;
  isBlocked: boolean;
  profile?: DoctorProfile[];
}