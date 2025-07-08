

export interface IUser {
 
  name: string;
  email: string;
  password?: string; 
  role: "user" | "doctor" | "admin";
  avatar?: string;
  isVerified?: boolean;
  googleId?: string; 
  authProvider?: "local" | "google"; 
  refreshToken?: string;
  photo?: string; 
  isBlocked: boolean;
}