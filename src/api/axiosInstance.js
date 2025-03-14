import axios from "axios";
import { renewTokens } from "./auth.api";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
  withCredentials: true, // Sends cookies with requests
});

export const handleApiError = async (error) => {
  console.log("Error inside handleapierror:", error);
  console.log("Error response:", error?.response);
  try {
    const errorMessage = error?.response?.data?.message;
    const status = error?.response?.status;

    // when Access token expired, get new access token and prompt user to try again
    if (status === 401 && (errorMessage === "Access Token Expired!" || errorMessage === "Unauthorized! Access token is missing!")) {
      try {
        await renewTokens();
        const result = axiosInstance(error?.config); // retry the original request
        console.log("Result:", result);
        return result;
      } catch (tokenError) {
        return { error: `Session expired. Please log in again: ${tokenError}` };
      }
    }

    return { error: errorMessage };
  } catch (err) {
    console.log("err:",err)
    throw new Error("An unexpected err occurred inside api error!");
  }
};
