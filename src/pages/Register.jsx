import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { Carousel, InputField, Error } from "../components";
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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
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
    e.preventDefault();
    if (validateForm()) {
      const response = await registerUser(form);

      if (response.error) {
        setErrors({...errors, general: response.error});
      }
    }
  };

  return (
    <div className="flex flex-col xl:flex-row h-screen">
      {/* Carousel */}
      <div className="w-full h-1/3 xl:w-1/2 xl:h-full flex items-center justify-center">
        <Carousel />
      </div>

      {/* Form */}
      <div className="w-full h-2/3 xl:w-1/2 xl:h-full flex items-center justify-center">
        <div className="bg-white p-6">

          <h2 className="text-5xl font-bold text-left">Create an account</h2>

          <p className="text-left text-sm text-gray-600 mt-8">
            Already have an account? <Link to="/login" className="text-blue-600 font-medium">Log in</Link>
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
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
