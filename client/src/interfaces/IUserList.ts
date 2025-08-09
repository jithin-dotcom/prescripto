

export interface UserProfile {
  city?: string;
  state?: string;
}

export interface User {
  // _id: string;
  id: string;
  name: string;
  email: string;
  photo?: string;
  isVerified: boolean;
  isBlocked: boolean;
  profile?: UserProfile[];
}