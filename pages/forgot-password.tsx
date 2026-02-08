"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { colors, ThemeKey } from "@/theme";
import { authstore } from "@/components/store/authstore";

export default function ForgotPasswordPage() {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.hero[themeKey];

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Use the store method
  const forgotPassword = authstore((state) => state.forgotPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // 🔹 Call the centralized authstore method
      const msg = await forgotPassword(email);
      setMessage(msg);
    } catch (error: any) {
      setMessage(error?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`min-h-screen flex items-center justify-center px-6 ${themeColors.bg} ${themeColors.text}`}
    >
      <div className="w-full max-w-md rounded-xl shadow-lg p-6 md:p-8 border border-gray-300 dark:border-gray-700">
        <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full px-4 py-2 rounded-md
              border border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder-gray-500 dark:placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-2 rounded-md font-medium
              bg-blue-600 text-white hover:bg-blue-700
              transition disabled:opacity-50
            "
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Message Feedback */}
        {message && (
          <p className="text-sm mt-4 text-center text-green-600 dark:text-green-400">
            {message}
          </p>
        )}

        {/* Back to Login */}
        <p className="text-sm mt-6 text-center text-gray-600 dark:text-gray-400">
          Remembered your password?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </section>
  );
}
