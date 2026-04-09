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

  const isDark = theme === "dark";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login({ email, password });
      const role = result.user?.role;

      navigate(role === "admin" ? "/admin" : "/");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = clsx(
    "w-full px-4 py-3 border-none rounded-xl outline-none transition-all placeholder-gray-400 text-sm",
    isDark
      ? "bg-[#2C2C2C] text-white focus:ring-2 focus:ring-[#4F5BFF]"
      : "bg-[#EFECEC] text-gray-700 focus:ring-2 focus:ring-[#4F5BFF]",
  );

  const labelStyle = clsx(
    "block text-xs font-bold mb-1 uppercase tracking-wider",
    isDark ? "text-gray-500" : "text-gray-400",
  );

  return (
    <div
      className={clsx(
        "min-h-screen flex items-center justify-center px-4 transition-colors duration-300",
        isDark ? "bg-[#121212]" : "bg-gray-50",
      )}
    >
      <div
        className={clsx(
          "w-full max-w-md p-8 rounded-4xl shadow-xl transition-all",
          isDark ? "bg-[#1C1B1B] text-white" : "bg-white text-gray-900",
        )}
      >
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Please enter your credentials to access the Curator
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div
              className={clsx(
                "p-3 rounded-xl text-xs font-bold text-center border",
                isDark
                  ? "bg-red-900/20 border-red-800 text-red-400"
                  : "bg-red-50 border-red-100 text-red-600",
              )}
            >
              {error}
            </div>
          )}

          <div>
            <label className={labelStyle}>Email Address</label>
            <input
              type="email"
              placeholder="curator@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputStyle}
              disabled={loading}
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className={labelStyle}>Password</label>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputStyle}
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={clsx(
              "w-full bg-[#4F5BFF] hover:bg-[#3D49E6] text-white font-bold py-4 rounded-xl shadow-lg transition-all transform active:scale-[0.98] mt-2 flex items-center justify-center gap-2",
              loading && "opacity-70 cursor-not-allowed",
            )}
          >
            {loading ? (
              <Loader color="white" size="sm" />
            ) : (
              <>
                Sign In <IconArrowRight size={20} stroke={3} />
              </>
            )}
          </button>
        </form>

        <footer className="mt-8 text-center text-sm font-medium">
          <span className="text-gray-500">Not a member yet?</span>{" "}
          <NavLink
            to="/register"
            className="text-[#4F5BFF] font-bold hover:underline ml-1"
          >
            Create Account
          </NavLink>
        </footer>
      </div>
    </div>
  );
};

export default Login;
