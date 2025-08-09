import { useState } from "react";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

import { InputField } from "../components";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post("/api/v1/auth/request-reset", { email });

      if (res.data?.success) {
        toast.success(res.data.message || "OTP sent to your email");
        // You can redirect to the next OTP verification step here if needed
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setEmail(e.target.value);

  return (
    <div className="h-dvh w-full flex items-center justify-center bg-white">
      <div className="p-6">

        {/* Heading */}
        <h2 className="text-5xl font-bold text-center">Reset Password</h2>

        <p className="text-sm text-gray-600 text-center mt-4">
          Enter your email address and we'll send you an OTP to reset your password.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <InputField
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            handleChange={handleChange}
            autoComplete="email"
          />

          <button
            type="submit"
            className={`w-full text-white py-3 rounded-md bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600 transition disabled:opacity-70`}
            disabled={!email || loading}
          >
            {loading ? (
              <div className="flex justify-center gap-3">
                <LoaderCircle className="animate-spin" />
                Sending OTP . . .
              </div>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <Link to="/auth/login" className="text-blue-600 hover:underline text-sm">
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;
