import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

import { InputField } from "../components";
import { registerUser } from "../api/auth.api";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    termsAccepted: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const firstName = form.firstName.trim();
      const lastName = form.lastName.trim();
      const email = form.email.trim();
      const password = form.password.trim();
      const termsAccepted = form.termsAccepted;

      if (!firstName) {
        toast.error("First name is required");
        return;
      }
      if (!lastName) {
        toast.error("Last name is required");
        return;
      }
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        toast.error("Invalid email address!");
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
      if (!termsAccepted) {
        toast.error("You must accept the terms and conditions");
        return;
      }

      const response = await registerUser({ firstName, lastName, email, password });
      const data = response.data;

      if (data?.emailSent) {
        alert(`A confirmation email has been sent to ${email}. Please check your inbox and follow the instructions to verify your account.`)
      }

      if (response?.error) {
        toast.error(response.error);
        console.error("Error response while creating account:", response);
      }

    } catch (error) {
      toast.error(error?.message || "Something went wrong while creating account!");
      console.error("Error while creating account:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="w-full h-2/3 xl:w-1/2 xl:h-full flex items-center justify-center">
        <div className="bg-white p-6">

          <h2 className="text-5xl font-bold text-left">Create an account</h2>

          <p className="text-left text-sm text-gray-600 mt-8">
            Already have an account? <Link to="/auth/login" className="text-blue-600 font-medium">Log in</Link>
          </p>

          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <InputField
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  handleChange={handleChange}
                />
              </div>
              <div className="w-1/2">
                <InputField
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  handleChange={handleChange}
                />
              </div>
            </div>

            {/* Email Field */}
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              handleChange={handleChange}
            />

            {/* Password Field */}
            <div className="relative">
              <InputField
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                handleChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-center text-sm">
              <InputField
                type="checkbox"
                name="termsAccepted"
                checked={form.termsAccepted}
                handleChange={handleChange}
              />
              <span className="ml-1">
                I agree to the <Link to="/terms-and-conditions" className="text-blue-600">Terms & Conditions</Link>
              </span>
            </label>


            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full text-white py-2 rounded-md ${ loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700 transition"}`}
              disabled={loading}
            >
              {loading ? (
              <div className="flex justify-center gap-3">
                <LoaderCircle className="animate-spin" />
                Creating account . . .
              </div>
            ) : (
              "Create account"
            )}
            </button>
          </form>
        </div>
      </div>
  );
};

export default Register;
