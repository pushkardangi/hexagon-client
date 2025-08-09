import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { requestPasswordReset, confirmPasswordReset } from "../api";
import { InputField } from "../components";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState("email");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (screen === "email") {
        // Request OTP
        const res = await requestPasswordReset(email);

        if (res.success) {
          toast.success(res.message || "OTP sent to your email");
          setScreen("otp");
        } else {
          toast.error(res.message || "Something went wrong. Please try again.");
        }
      } else if (screen === "otp") {
        // Confirm OTP & Reset Password
        const res = await confirmPasswordReset({ email, otp, newPassword });

        if (res.success) {
          toast.success(res.message || "Password reset successful");
          setEmail("");
          setOtp("");
          setNewPassword("");
          setTimeout(() => {
            navigate("/auth/login");
          }, 3000);
        } else {
          toast.error(res.message || "Failed to reset password.");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-dvh w-full flex items-center justify-center bg-white">
      <div className="p-6 w-full max-w-md">
        {/* Heading */}
        <h2 className="text-5xl font-bold text-center">Reset Password</h2>

        <p className="text-sm text-gray-600 text-center mt-4">
          {screen === "email"
            ? "Enter your email address and we'll send you an OTP to reset your password."
            : "Enter the OTP you received and set new password."}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <InputField
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            disabled={screen === "otp"}
          />

          {screen === "otp" && (
            <>
              <InputField
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                handleChange={(e) => setOtp(e.target.value)}
              />

              <div className="relative">
                <InputField
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={newPassword}
                  handleChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </>
          )}

          <button
            type="submit"
            className={`w-full text-white py-3 rounded-md bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600 transition disabled:opacity-70`}
            disabled={loading || (screen === "email" && !email) || (screen === "otp" && (!otp || !newPassword))}
          >
            {loading ? (
              <div className="flex justify-center gap-3">
                <LoaderCircle className="animate-spin" />
                {screen === "email" ? "Sending OTP..." : "Resetting Password..."}
              </div>
            ) : screen === "email" ? (
              "Send OTP"
            ) : (
              "Reset Password"
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
