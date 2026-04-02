import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import clsx from "clsx";
import { Loader } from "@mantine/core";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { theme } = useThemeContext();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null as File | null,
    password_confirmation: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("password_confirmation", form.password_confirmation);
    formData.append("bio", form.bio);

    if (form.avatar) {
      formData.append("avatar", form.avatar);
    }
    setLoading(true);
    try {
      await register(formData);
      navigate("/login");
    } catch (err: any) {
      console.log(err.response?.data);
      alert(JSON.stringify(err.response?.data));
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = clsx(
    "w-full px-4 py-3 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400 text-gray-700 transition-all",
    {
      "bg-[#EFECEC] text-gray-700 focus:ring-2 focus:ring-[#4F5BFF]":
        theme === "light",
      "bg-[#2C2C2C] text-white focus:ring-2 focus:ring-[#4F5BFF]":
        theme === "dark",
    },
  );
  const labelStyle =
    "block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider";

  return (
    <div
      className={clsx(
        "min-h-screen flex items-center justify-center px-4 transition-colors duration-300",
        theme === "dark" ? "bg-[#121212]" : "bg-gray-50",
      )}
    >
      <div
        className={clsx(
          "w-full max-w-md p-8 rounded-4xl shadow-xl transition-all",
          theme === "dark"
            ? "bg-[#1C1B1B] text-white"
            : "bg-white text-gray-900",
        )}
      >
        <header className="mb-8">
          <h1
            className={clsx("text-4xl font-extrabold mb-2", {
              "text-gray-900": theme === "light",
              "text-white": theme === "dark",
            })}
          >
            Create Account
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Enter your details to begin your journey with The Curator.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={labelStyle}>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className={inputStyle}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className={labelStyle}>Email Address</label>
            <input
              type="email"
              placeholder="curator@example.com"
              className={inputStyle}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className={inputStyle}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <div>
              <label className={labelStyle}>Confirm</label>
              <input
                type="password"
                placeholder="••••••••"
                className={inputStyle}
                onChange={(e) =>
                  setForm({ ...form, password_confirmation: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Bio (Optional)</label>
            <textarea
              placeholder="Tell us about yourself..."
              className={`${inputStyle} resize-none h-20`}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>

          <div>
            <label className={labelStyle}>Profile Picture</label>
            <input
              type="file"
              className={`text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold ${theme === "light" ? "file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" : "file:bg-[#2C2C2C] file:text-gray-400 hover:file:bg-[#2f2f2f]"} transition-all duration-300 cursor-pointer`}
              onChange={(e) =>
                setForm({ ...form, avatar: e.target.files?.[0] || null })
              }
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
            {loading ? <Loader color="white" size="sm" /> : <>Create Account</>}
          </button>
        </form>

        <footer className="mt-8 text-center text-sm text-gray-500">
          Already a member?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Login
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Register;
