import { useState } from "react";
import clsx from "clsx";
import { useThemeContext } from "../../context/ThemeContext";

const WeeklyDigest = () => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div
      className={clsx(
        "rounded-2xl p-6 mb-6 text-center",
        isDark
          ? "bg-gradient-to-br from-[#2C2B2B] to-[#1C1B1B]"
          : "bg-gradient-to-br from-gray-50 to-white border border-gray-200",
      )}
    >
      <h3
        className={clsx(
          "text-lg font-bold mb-2",
          isDark ? "text-white" : "text-gray-900",
        )}
      >
        Weekly Digest
      </h3>

      <p
        className={clsx(
          "text-sm mb-4",
          isDark ? "text-gray-400" : "text-gray-600",
        )}
      >
        Get the best stories delivered straight to your inbox every Sunday
        morning.
      </p>

      <form onSubmit={handleSubscribe} className="space-y-3">
        <input
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={clsx(
            "w-full px-4 py-3 rounded-lg text-sm transition-all outline-none",
            isDark
              ? "bg-[#1C1B1B] text-white placeholder-gray-600 border border-gray-700 focus:border-[#4F5BFF]"
              : "bg-white text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-[#1C2AC8]",
          )}
          required
        />

        <button
          type="submit"
          className={clsx(
            "w-full py-3 rounded-lg font-semibold text-white transition-all",
            isSubscribed ? "bg-green-500" : "bg-[#1C2AC8] hover:bg-[#151CA0]",
          )}
        >
          {isSubscribed ? "✓ Subscribed!" : "Subscribe Now"}
        </button>
      </form>
    </div>
  );
};

export default WeeklyDigest;
