import { axiosInstance, handleApiError } from "../axiosInstance";

export const reportBug = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/bugs", payload);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
