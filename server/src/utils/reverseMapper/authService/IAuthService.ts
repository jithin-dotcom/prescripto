


export interface SignupRequestDTO {
  name: string;
  email: string;
  password: string;
  role: "user" | "doctor" | "admin";
}


export interface SignupData {
  name: string;
  email: string;
  password: string; 
  role: "user" | "doctor" | "admin";
  isBlocked: boolean;
}
