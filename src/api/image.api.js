import { axiosInstance } from "./axiosInstance";

export const generateImageApi = async (data) => {
  const response = await axiosInstance.post("/images/generate", data);
  return response.data;
};

export const uploadImageApi = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axiosInstance.post("/images/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getSavedImagesApi = async (page = 1, limit = 12) => {
  const response = await axiosInstance.get(`/images/saved?page=${page}&limit=${limit}`);
  return response.data;
};

export const trashImagesApi = async (imageIds) => {
  const response = await axiosInstance.patch("/images/trash", { images: imageIds });
  return response.data;
};
