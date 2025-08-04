import { useState } from "react";
import useSWR from "swr";
import { axiosInstance } from "../../../api/axiosInstance";

const CreateCodeModal = ({ onClose, onSuccess }) => {
  const [code, setCode] = useState("");
  const [credits, setCredits] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code.trim() || !credits || !expiresAt) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/admin/redeem-code", {
        code: code.trim(),
        credits: Number(credits),
        expiresAt,
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating code:", error);
      alert(error?.response?.data?.message || "Failed to create redeem code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Create Redeem Code</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter code"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Credits</label>
            <input
              type="number"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter credits"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Expiry Date</label>
            <input
              type="date"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCodeModal;
