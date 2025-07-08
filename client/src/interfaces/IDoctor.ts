

export interface Doctor {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  isBlocked: boolean;
  isVerified: boolean;
  profile: {
    specialization?: string;
  }[];
}
