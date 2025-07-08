

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState } from "./IAuthStore";

// interface AuthState {
//   accessToken: string | null;
//   role: "user" | "doctor" | "admin" | null;
//   user: {
//     _id: string;
//     name: string;
//     email: string;
//     role: "user" | "doctor" | "admin";
//     isVerified?: boolean;
//     googleId?: string;
//     photo?:string;
//     authProvider?: "local" | "google";
//   } | null;
//   hasHydrated: boolean;
//   setAuth: (data: {
//     accessToken: string;
//     user?: AuthState["user"]; 
//   }) => void;
//   setUser: (user: AuthState["user"]) => void;
//   logout: () => void;
//   setHasHydrated: (hydrated: boolean) => void;
// }

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      role: null,
      user: null,
      hasHydrated: false,

      setAuth: ({ accessToken, user }) => {
        set({
          accessToken,
          user: user || null,
          role: user?.role || null,
        });
      },

      setUser: (user) => set({ user, role: user?.role || null }),

      logout: () => {
        set({ accessToken: null, role: null, user: null });
        localStorage.removeItem("auth-storage");
      },

      setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);







