import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { InputField, Error } from "../components";
import { loginUser } from "../api/auth.api";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email format";
    if (form.password.length < 6) newErrors.password = "Incorrect password";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {

      const credentials = {
        email: form.email.trim(),
        password: form.password.trim(),
      };

      const response = await loginUser(credentials);

      if (response.error) {
        setErrors({...errors, general: response.error});
      }

      // console.log("Response:", response)

      // update the context value (WIP)
      // login(response)

      navigate("/");
    }
  };

  return (
    <div className="w-full h-2/3 xl:w-1/2 xl:h-full flex items-center justify-center">
      <div className="bg-white p-6">

        <h2 className="text-5xl font-bold text-left">Login to your account</h2>

        <p className="text-left text-sm text-gray-600 mt-8">
          Don't have an account?
          <Link to="/auth/register" className="text-blue-600 font-medium mx-1">Create one</Link>
        </p>
        <Error error={errors.general} />

        <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
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

          {/* Forgot Password Page */}
          <div className="flex justify-end text-sm text-blue-600">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
