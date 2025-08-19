import {
  registerUser,
  loginUser,
  renewTokens,
  logoutUser,
  requestPasswordReset,
  confirmPasswordReset,
} from "./auth.api";
import { redeemTheCode } from "./billing.api";
import {
  createRedeemCode,
  getRedeemCodeInfo,
  updateRedeemCode,
  deleteRedeemCode,
  generateBulkRedeemCodes,
  fetchBulkRedeemCodes,
  deleteBulkRedeemCodes,
} from "./admin/redeemCode.api";
import { fetchAllUsers } from "./admin/users";
import { reportBug } from "./admin/bugs.api";
import { submitFeatureRequest, getFeatureUpdates } from "./support.api";

export {
  registerUser,
  loginUser,
  renewTokens,
  logoutUser,
  requestPasswordReset,
  confirmPasswordReset,
  redeemTheCode,
  createRedeemCode,
  getRedeemCodeInfo,
  updateRedeemCode,
  deleteRedeemCode,
  generateBulkRedeemCodes,
  fetchBulkRedeemCodes,
  deleteBulkRedeemCodes,
  fetchAllUsers,
  reportBug,
  submitFeatureRequest,
  getFeatureUpdates,
};
