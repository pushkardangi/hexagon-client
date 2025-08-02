import { axiosInstance, handleApiError } from "./axiosInstance";

export const generateImageApi = async (data) => {
  try {
    const response = await axiosInstance.post("/images/generate", data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const uploadImageApi = async (data) => {
  try {
    const response = await axiosInstance.post("/images/upload", data, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getSavedImagesApi = async (page = 1, limit = 12) => {
  try {
    const response = await axiosInstance.get(`/images/saved?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const trashImagesApi = async (imageIds) => {
  try {
    const response = await axiosInstance.patch("/images/trash", { images: imageIds });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
