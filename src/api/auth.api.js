import { axiosInstance, handleApiError } from "./axiosInstance.js";

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/users/register", userData, {
      headers: { "Content-Type": "application/json" },
    });

    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const credentials = { email, password };

    const response = await axiosInstance.post("/auth/login", credentials, {
      headers: { "Content-Type": "application/json" },
    });

    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const renewTokens = async () => {
  try {
    await axiosInstance.post("/auth/renew-tokens");
  } catch (error) {
    return handleApiError(error);
  }
};

export const logoutUser = async () => {
  try {
    await axiosInstance.post("/auth/logout");
  } catch (error) {
    return handleApiError(error);
  }
};
