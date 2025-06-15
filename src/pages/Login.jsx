import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import api from "../api/axio";
import { useAuth } from "../context/authContext";

// 1️. Define Zod schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  // علشان AuthContextنستخدم (token + user)بعد ما السيرفر يرجّع البيانات

  // contextنخزن التوكن والمستخدم في الـ
  // (مثل Navbar وUser Profile)نستخدمهم في باقي صفحات الموقع

  const { login } = useAuth();

  const navigate = useNavigate();

  // 1. Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // 2️. Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 3️. Validate input
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      // Extract Zod errors
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    // No errors
    setErrors({});
    console.log("Login data is valid ", { email, password });

    // ========================= Send login request to backend===========================
    try {
      // 1. Send login request to API
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      console.log(" Logged in:", res.data);

      //2. Store user & token in context/state
      login(res.data.user, res.data.token);

      // 3. Navigate to home
      navigate("/");
    } catch (err) {
      console.error(" Login error:", err);
      if (err.response?.data?.message) {
        setErrors({ general: err.response.data.message });
      } else {
        setErrors({ general: "Login failed" });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-base-100 p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className={`input input-bordered w-full ${
                errors.email ? "input-error" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className={`input input-bordered w-full ${
                errors.password ? "input-error" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-error text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
          {errors.general && (
            <p className="text-error text-sm mt-1">{errors.general}</p>
          )}

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
