import { IconArrowRight } from "@tabler/icons-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useThemeContext } from "../context/ThemeContext";
import clsx from "clsx";
import { Loader } from "@mantine/core";

const Login = () => {
  const { login } = useAuth();
  const { theme } = useThemeContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login({ email, password });
      navigate("/");
    } catch (error) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={clsx(
        "min-h-screen flex items-center justify-center px-4",
        theme === "dark" ? "bg-[#121212]" : "bg-[#f8fafc]",
      )}
    >
      <div
        className={clsx(
          "w-full max-w-md p-8 rounded-2xl shadow-lg transition-all",
          theme === "dark"
            ? "bg-[#1C1B1B] text-white"
            : "bg-white text-[#1C1B1B]",
        )}
      >
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-2">Login to your account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          method="POST"
          className="flex flex-col gap-4"
        >
          {error && (
            <div
              className={clsx(
                "p-3 rounded-lg text-sm text-center",
                theme === "dark"
                  ? "bg-red-900/30 text-red-400 border border-red-800"
                  : "bg-red-50 text-red-600 border border-red-200",
              )}
            >
              {error}
            </div>
          )}

          <div>
            <label className="text-sm font-semibold">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={clsx(
                "mt-1 w-full p-3 rounded-lg border outline-none transition",
                theme === "dark"
                  ? "bg-[#2C2C2C] border-[#3C3C3C] text-white placeholder-gray-400 focus:border-[#5866FA]"
                  : "bg-white border-gray-300 focus:border-[#5866FA]",
              )}
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={clsx(
                "mt-1 w-full p-3 rounded-lg border outline-none transition",
                theme === "dark"
                  ? "bg-[#2C2C2C] border-[#3C3C3C] text-white placeholder-gray-400 focus:border-[#5866FA]"
                  : "bg-white border-gray-300 focus:border-[#5866FA]",
              )}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[#5866FA] hover:bg-[#3C4AE0] text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader color="white" size={20} />
              </div>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Login <IconArrowRight size={18} />
              </span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">Don't have an account?</span>{" "}
          <NavLink
            to="/register"
            className="text-[#5866FA] font-semibold hover:underline"
          >
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
