import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { profileServices } from "../services/profile/profileServices";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (token, userData) =>
        set({
          token: token,
          user: userData,
          isAuthenticated: true,
        }),

      logout: () => {
        (set({
          token: null,
          user: null,
          isAuthenticated: false,
        }),
          localStorage.removeItem("auth-storage"));
        localStorage.removeItem("quiz-storage");
      },

      setUser: (userData) =>
        set({
          user: userData,
        }),

      updateUser: (updatedData) =>
        set((state) => ({
          user: { ...state.user, ...updatedData },
        })),

      fetchUser: async () => {
        try {
          const response = await profileServices.getProfile();

          set({ user: response.data.user || response.data });
        } catch (error) {
          console.error("Gagal update data user:", error);
        }
      },
    }),

    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
