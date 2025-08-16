import { axiosInstance, handleApiError } from "../axiosInstance";

export const reportBug = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/bugs/report", payload);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
