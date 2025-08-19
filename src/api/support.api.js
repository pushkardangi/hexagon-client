import { axiosInstance, handleApiError } from "./axiosInstance";

export const submitFeatureRequest = async (featureData) => {
  try {
    const response = await axiosInstance.post("/support/feature", featureData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getFeatureUpdates = async (status, priority) => {
  try {
    const params = {};

    if (status) params.status = status;
    if (priority) params.priority = priority;

    const response = await axiosInstance.get("/admin/support/feature", { params });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
