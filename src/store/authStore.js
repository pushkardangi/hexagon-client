import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      showLogoutModal: false,

      login: (userData) =>
        set({
          isAuthenticated: true,
          user: userData,
        }),

      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
          showLogoutModal: false,
        }),

      setUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),

      showLogoutModalAction: () =>
        set({
          showLogoutModal: true,
        }),

      hideLogoutModal: () =>
        set({
          showLogoutModal: false,
        }),
    }),
    {
      name: "hexagon-auth",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;
