import axios from "axios";
import { renewTokens } from "./auth.api";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
  withCredentials: true, // Sends cookies with requests
});

export const handleApiError = async (error) => {
  try {
    const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
    const status = error?.response?.status;

    console.log("Error occured :", status, errorMessage); // Log

    // when Access token expired, get new access token and prompt user to try again
    if (status === 401 && (errorMessage === "Access Token Expired!" || errorMessage === "Unauthorized! Access token is missing!")) {
      try {
        await renewTokens();
        const result = axiosInstance(error?.config); // retry the original request
        return result;
      } catch (tokenError) {
        return { error: `Session expired. Please log in again: ${tokenError}` };
      }
    }

    return { error: errorMessage };
  } catch (err) {
    throw new Error(`An unexpected err occurred : ${err}`);
  }
};
