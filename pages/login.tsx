"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { colors, ThemeKey } from "@/theme";
import { authstore } from "@/components/store/authstore"; // your store

export default function LoginPage() {
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const { login, user } = authstore(); // 🔹 get login & user from store

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" }); // 🔹 email instead of username
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  // Redirect if already logged in
  useEffect(() => {
    if (user) router.replace("/"); // 🔹 only redirect if backend-authenticated
  }, [user, router]);

  if (!mounted) return null;

  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.hero[themeKey];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 🔹 Backend login via authstore (JWT)
      await login(form.email, form.password);
      router.push("/"); // redirect after successful login
    } catch (err: any) {
      setError(err?.message || "Login failed. Check email/password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`min-h-screen flex items-center justify-center px-6 ${themeColors.bg} ${themeColors.text}`}>
      <div className="w-full max-w-md rounded-xl shadow-lg p-6 md:p-8 border border-gray-300 dark:border-gray-700">
        <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Login to continue shopping</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="text-right">
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm mt-6 text-center text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </section>
  );
}
