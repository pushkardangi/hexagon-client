import { useState } from "react";
import useSWR from "swr";
import CreateCodeModal from "./CreateCodeModal";
import GenerateBulkModal from "./GenerateBulkModal";
import { fetchBulkRedeemCodes } from "../../../api";
import { formatDate, formatDateTime } from "../../../utils";

const RedeemCodeManagement = () => {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  const { data, error, isLoading, mutate } = useSWR(
    ["bulk-redeem-codes", filter, sort],
    () => fetchBulkRedeemCodes(filter, sort),
    {
      refreshInterval: 60000,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      keepPreviousData: true,
    }
  );

  const codes = data?.data || [];

  if (error) {
    console.error("Error while fetching redeem code data:", error);
  }

  const deleteBulk = () => {};

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border rounded px-2 py-1">
            <option value="all">All</option>
            <option value="used">Used</option>
            <option value="unused">Unused</option>
            <option value="expired">Expired</option>
            <option value="expiringSoon">Expiring Soon</option>
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)} className="border rounded px-2 py-1">
            <option value="">Sort by</option>
            <option value="highValue">High Value</option>
            <option value="lowValue">Low Value</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setShowCreateModal(true)} className="px-3 py-1 bg-blue-500 text-white rounded">
            Create Code
          </button>
          <button onClick={() => setShowBulkModal(true)} className="px-3 py-1 bg-green-500 text-white rounded">
            Generate Bulk
          </button>
          <button onClick={deleteBulk} className="px-3 py-1 bg-red-500 text-white rounded">
            Delete Selected
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading codes...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">
                <input
                  type="checkbox"
                  checked={selectedIds?.length === codes.length && codes.length > 0}
                  onChange={(e) => setSelectedIds(e.target.checked ? codes.map((c) => c._id) : [])}
                />
              </th>
              <th className="p-2 border">Code</th>
              <th className="p-2 border">Credits</th>
              <th className="p-2 border">Expiry</th>
              <th className="p-2 border">Used</th>
              <th className="p-2 border">Used By</th>
              <th className="p-2 border">Used At</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((code) => (
              <tr key={code._id}>
                <td className="p-2 border">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(code._id)}
                    onChange={(e) =>
                      setSelectedIds((prev) =>
                        e.target.checked ? [...prev, code._id] : prev.filter((id) => id !== code._id)
                      )
                    }
                  />
                </td>
                <td className="p-2 border">{code.code}</td>
                <td className="p-2 border">{code.credits}</td>
                <td className="p-2 border">{formatDate(code.expiresAt)}</td>
                <td className="p-2 border">{code.isUsed ? "Yes" : "No"}</td>
                <td className="p-2 border">{code.usedBy || "-"}</td>
                <td className="p-2 border">{formatDateTime(code.usedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modals */}
      {showCreateModal && <CreateCodeModal onClose={() => setShowCreateModal(false)} onSuccess={mutate} />}
      {showBulkModal && <GenerateBulkModal onClose={() => setShowBulkModal(false)} onSuccess={mutate} />}
    </div>
  );
};

export default RedeemCodeManagement;
