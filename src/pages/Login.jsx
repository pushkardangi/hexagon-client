import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

import { InputField } from "../components";
import { loginUser } from "../api/auth.api";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Invalid email address!");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Incorrect password!");
      return;
    }

    setLoading(true);

    try {
      const credentials = {
        email: form.email.trim(),
        password: form.password.trim(),
      };

      const response = await loginUser(credentials);

      if (response?.error) {
        toast.error(response.error);
        console.error("Error response while login:", response);
        return;
      }

      // update the context value
      login(response.data);

      navigate("/");
    } catch (error) {
      toast.error(error?.message || "Something went wrong while login!");
      console.error("Error while user login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-2/3 xl:w-1/2 xl:h-full flex items-center justify-center">
      <div className="bg-white p-6">
        <h2 className="text-5xl font-bold text-left">Login to your account</h2>

        <p className="text-left text-sm text-gray-600 mt-8">
          Don't have an account?
          <Link to="/auth/register" className="text-blue-600 font-medium mx-1">
            Create one
          </Link>
        </p>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <InputField type="email" name="email" placeholder="Email" value={form.email} handleChange={handleChange} />

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

          {/* Forgot Password Page */}
          <div className="flex justify-end text-sm text-blue-600">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full text-white py-2 rounded-md ${
              loading ? "bg-blue-500" : "bg-blue-600 hover:bg-blue-700 transition"
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center gap-3">
                <LoaderCircle className="animate-spin" />
                Logging you in . . .
              </div>
            ) : (
              "Login now"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
