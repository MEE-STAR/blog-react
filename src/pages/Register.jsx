import { useState } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axio";

// 1️. Define Zod schema for registration
const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Register = () => {
  const navigate = useNavigate();

  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // 2️. Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 3️. Validate with Zod
    const result = registerSchema.safeParse({ username, email, password });

    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    // If valid
    setErrors({});
    console.log("Register data is valid ", { username, email, password });

    // ============================Send to API=========================
    try {
      //  Send registration request to API
      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });
      console.log(" Registered:", res.data);

      //  Navigate to login page
      navigate("/login");
    } catch (err) {
      console.error(" Registration error:", err);

      if (err.response?.data?.message) {
        setErrors({ general: err.response.data.message });
      } else {
        setErrors({ general: "Something went wrong" });
      }
    }
  };


return (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-full max-w-md bg-base-100 p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            className={`input input-bordered w-full ${
              errors.username ? "input-error" : ""
            }`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && (
            <p className="text-error text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* Email */}
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
            required
          />
          {errors.email && (
            <p className="text-error text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
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
            required
          />
          {errors.password && (
            <p className="text-error text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
        {errors.general && (
          <p className="text-error text-sm mt-1">{errors.general}</p>
        )}

        {/* Link to login */}
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  </div>
);
};

export default Register;
