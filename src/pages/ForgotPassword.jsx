import { useState } from "react";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

import { InputField } from "../components";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Simulating API call
    setTimeout(() => {
      console.log("Magic link sent to:", email);
      toast.success("Link has been sent to your email! Check your inbox", {
        duration: 4000,
      });
      setLoading(false);
    }, 3000);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="h-dvh w-full flex items-center justify-center bg-white">
      <div className="p-6">

        {/* Heading */}
        <h2 className="text-5xl font-bold text-center">Reset Password</h2>

        <p className="text-sm text-gray-600 text-center mt-4">
          Enter your email and we'll send you a link to get back into your account.
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
                Sending Login Link . . .
              </div>
            ) : (
              "Send Login Link"
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

export default ForgotPassword;
