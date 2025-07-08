

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState } from "./IAuthStore";


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







