

export interface UserProfile {
  city?: string;
  state?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  isVerified: boolean;
  isBlocked: boolean;
  profile?: UserProfile[];
}