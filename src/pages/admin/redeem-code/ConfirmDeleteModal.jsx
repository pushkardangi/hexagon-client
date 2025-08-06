import { useState } from "react";
import toast from "react-hot-toast";
import { deleteBulkRedeemCodes } from "../../../api";

const ConfirmDeleteModal = ({ selectedCodes = [], onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (selectedCodes.length === 0) return;

    setIsLoading(true);
    try {
      const response = await deleteBulkRedeemCodes(selectedCodes);

      if (response.success) {
        toast.success(response.message || "Codes deleted successfully");
        onSuccess();
      }
    } catch (error) {
      console.error("Error deleting codes:", error);
      toast.error(error?.response?.data?.message || "Failed to delete codes");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4 text-red-600">Confirm Delete</h2>
        <p className="mb-4 text-gray-700">
          Are you sure you want to delete <span className="font-semibold">{selectedCodes.length}</span> redeem code(s)?
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2 pt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" disabled={isLoading}>
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
