import { axiosInstance, handleApiError } from "./axiosInstance";

export const redeemTheCode = async (code) => {
  try {
    const data = { code };
    const response = await axiosInstance.post("/billing/redeem", data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
