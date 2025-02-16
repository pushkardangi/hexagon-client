import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { InputField, Error } from "../components";
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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({}); // clear errors when user modifies input to correct them
  };

  const validateForm = () => {
    let newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email format";
    if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!form.termsAccepted) newErrors.termsAccepted = "You must accept the terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      if (!validateForm()) return;

      const userData = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password.trim(),
      };

      const response = await registerUser(userData);
      const data = response.data;

      if (data?.emailSent) {
        alert(`A confirmation email has been sent to ${userData.email}. Please check your inbox and follow the instructions to verify your account.`)
      }

      // handles API errors
      if (response?.error) {
        setErrors((prev) => ({...prev, general: response.error}));
      }

    } catch (error) {
      setErrors((prev) => ({...prev, general: error.message}))
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
          <Error error={errors.general} />

          <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
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
                <Error error={errors.firstName} />
              </div>
              <div className="w-1/2">
                <InputField
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  handleChange={handleChange}
                />
                <Error error={errors.lastName} />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <InputField
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                handleChange={handleChange}
              />
              <Error error={errors.email} />
            </div>

            {/* Password Field */}
            <div>
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
              <Error error={errors.password} />
            </div>

            {/* Terms Checkbox */}
            <div>
              <label className="flex items-center text-sm">
                <InputField
                  type="checkbox"
                  name="termsAccepted"
                  checked={form.termsAccepted}
                  handleChange={handleChange}
                />
                <span className="ml-1">
                  I agree to the <Link to="/terms" className="text-blue-600">Terms & Conditions</Link>
                </span>
              </label>
              <Error error={errors.termsAccepted} />
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full text-white py-2 rounded-md ${ loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700 transition"}`}
              disabled={loading}
            >
              {loading ? "Creating Account . . ." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
  );
};

export default Register;
