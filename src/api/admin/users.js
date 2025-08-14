import { axiosInstance, handleApiError } from "../axiosInstance";

export const fetchAllUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/admin/users");
    return data?.data;
  } catch (error) {
    handleApiError(error);
  }
};
