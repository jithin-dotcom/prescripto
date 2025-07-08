
export interface AuthState {
  accessToken: string | null;
  role: "user" | "doctor" | "admin" | null;
  user: {
    _id: string;
    name: string;
    email: string;
    role: "user" | "doctor" | "admin";
    isVerified?: boolean;
    googleId?: string;
    photo?:string;
    authProvider?: "local" | "google";
  } | null;
  hasHydrated: boolean;
  setAuth: (data: {
    accessToken: string;
    user?: AuthState["user"]; 
  }) => void;
  setUser: (user: AuthState["user"]) => void;
  logout: () => void;
  setHasHydrated: (hydrated: boolean) => void;
}