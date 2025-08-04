import { axiosInstance, handleApiError } from "../axiosInstance";

// Create single redeem code
export const createRedeemCode = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/admin/redeem-code", payload);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get single redeem code info
export const getRedeemCodeInfo = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/admin/redeem-code/${id}`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update single redeem code
export const updateRedeemCode = async (id, payload) => {
  try {
    const { data } = await axiosInstance.patch(`/admin/redeem-code/${id}`, payload);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete single redeem code
export const deleteRedeemCode = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/admin/redeem-code/${id}`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Generate bulk redeem codes
export const generateBulkRedeemCodes = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/admin/redeem-codes", payload);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch all redeem codes with optional filter & sort
export const fetchBulkRedeemCodes = async (filter = "all", sort = "") => {
  try {
    const { data } = await axiosInstance.get("/admin/redeem-codes", {
      params: { filter, sort },
    });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Bulk delete redeem codes
export const deleteBulkRedeemCodes = async (ids) => {
  try {
    const { data } = await axiosInstance.delete("/admin/redeem-codes", { data: { ids } });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
