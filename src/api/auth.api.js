import { axiosInstance, handleApiError } from "./axiosInstance.js";

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/users/register", userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const renewTokens = async () => {
  try {
    const response = await axiosInstance.post("/auth/renew-tokens");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await axiosInstance.post(
      "/auth/password-reset/request",
      { email },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// credentials - email, otp and newPassword
export const confirmPasswordReset = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/password-reset/confirm", credentials, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
