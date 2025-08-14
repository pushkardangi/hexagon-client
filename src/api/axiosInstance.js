import axios from "axios";
import { useAuthStore } from "../store";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
  withCredentials: true, // Sends cookies with requests
});

export const handleApiError = async (error) => {
  try {
    const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
    const status = error?.response?.status;

    console.error(`[${error.config?.method?.toUpperCase()}] ${error.config?.url}`, `(${status})`, errorMessage);

    // If access token expired or missing → show logout modal
    if (
      status === 401 &&
      (errorMessage === "Access Token Expired!" || errorMessage === "Unauthorized! Access token is missing!")
    ) {
      // Use Zustand store to show logout modal
      const { showLogoutModalAction } = useAuthStore.getState();
      showLogoutModalAction();
      return { data: null, error: "Session expired" };
    }

    return { data: null, error: errorMessage };
  } catch (err) {
    return { data: null, error: `An unexpected error occurred: ${err.message}` };
  }
};
