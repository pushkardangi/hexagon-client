import { useState } from "react";
import { axiosInstance } from "../../../api/axiosInstance";

const GenerateBulkModal = ({ onClose, onSuccess }) => {
  const [baseCode, setBaseCode] = useState("");
  const [count, setCount] = useState("");
  const [credits, setCredits] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!baseCode.trim() || !count || !credits || !expiresAt) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/admin/redeem-codes/generate-bulk", {
        baseCode: baseCode.trim(),
        count: Number(count),
        credits: Number(credits),
        expiresAt,
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error generating bulk codes:", error);
      alert(error?.response?.data?.message || "Failed to generate bulk redeem codes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Generate Bulk Redeem Codes</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Base Code</label>
            <input
              type="text"
              value={baseCode}
              onChange={(e) => setBaseCode(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter base code (e.g., SUMMER2025)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Number of Codes</label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter count"
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
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateBulkModal;
