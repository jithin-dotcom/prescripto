

export interface Doctor {
  id: string;
  name: string;
  email: string;
  photo?: string;
  isBlocked: boolean;
  isVerified: boolean;
  profile: {
    specialization?: string;
    averageRating?: number;
    ratingCount?: number;
  }[];
}
