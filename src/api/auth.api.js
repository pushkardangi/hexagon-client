import { axiosInstance, handleApiError } from "./axiosInstance.js";

export const registerUser = async (userData) => {
  try {
    console.time("Register Axios"); // RM Log
    const response = await axiosInstance.post("/users/register", userData, {
      headers: { "Content-Type": "application/json" },
    });
    console.timeEnd("Register Axios"); // RM Log
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const loginUser = async (credentials) => {
  try {
    console.time("Login Axios"); // RM Log
    const response = await axiosInstance.post("/auth/login", credentials, {
      headers: { "Content-Type": "application/json" },
    });
    console.timeEnd("Login Axios"); // RM Log
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
