import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store";

const LogoutModal = () => {
  const navigate = useNavigate();
  const { showLogoutModal, logout, hideLogoutModal } = useAuthStore();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      // Add any cleanup logic here (API calls, clearing local storage, etc.)
      // await logoutApi(); // if you have a logout API endpoint

      logout(); // Clear Zustand auth state

      // Redirect to login page
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleCancel = () => {
    if (!isLoggingOut) {
      hideLogoutModal();
    }
  };

  if (!showLogoutModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-85" onClick={handleCancel} />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
        {/* Header */}
        <div className="mb-4">
          <h1 className="font-extrabold text-black text-2xl">Session Expired</h1>
          <p className="mt-2 text-gray-600 text-sm">Your session has expired. Please log in again to continue.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`font-medium rounded-md text-sm w-full sm:w-32 px-5 py-2.5 text-center text-white ${
              isLoggingOut ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isLoggingOut ? "Logging out..." : "Log Out"}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            disabled={isLoggingOut}
            className={`font-medium rounded-md text-sm w-full sm:w-32 px-5 py-2.5 text-center border ${
              isLoggingOut
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
