

export interface LoginResponse {
  message: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    id: string ;
    name: string;
    email: string;
    role: "user" | "doctor" | "admin";
    avatar?: string;
  };
}
