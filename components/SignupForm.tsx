"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // pages router
import { authstore } from "@/components/store/authstore";
import { SignupResponse } from "@/lib/types";

interface SignupFormProps {
  themeColors: { bg: string; text: string };
}

export default function SignupForm({ themeColors }: SignupFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong">("weak");

  const signup = authstore((state) => state.signup);

  const evaluatePasswordStrength = (password: string) => {
    let strength = 0;
    if (/[A-Za-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;
    if (password.length < 8 || strength === 1) return "weak";
    if (strength === 2) return "medium";
    return "strong";
  };

  const strengthColor = { weak: "text-red-500", medium: "text-yellow-500", strong: "text-green-500" };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "password") setPasswordStrength(evaluatePasswordStrength(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(form.password)) {
      setError("Password must be 8+ characters with a letter, number, and special character.");
      return;
    }

    setLoading(true);
    try {
      const data: SignupResponse = await signup(form.email, form.password, form.displayName);

      // 🔹 DEV MODE: redirect to verification page automatically
      if (data.verification_link && process.env.NODE_ENV === "development") {
        // extract uid and token from link
        const url = new URL(data.verification_link);
        const paths = url.pathname.split("/").filter(Boolean);
        const uid = paths[paths.length - 2];
        const token = paths[paths.length - 1];

        router.push(`/verify-email/${uid}/${token}`);
        return;
      }

      // In production, show a message to check email
      alert("Signup successful! Check your email to verify your account.");
      router.push("/login");
    } catch (err: any) {
      if (err.response) {
        const data = await err.response.json();
        if (data.email && data.email[0]) {
          setError(`Email error: ${data.email[0]}`);
        } else {
          setError(data.detail || "Signup failed");
        }
      } else {
        setError(err?.message || "Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl shadow-lg p-6 md:p-8 border border-gray-300 dark:border-gray-700">
      <h1 className="text-2xl font-semibold mb-2">Create an account</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Sign up to start shopping with us
      </p>

      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="displayName"
          placeholder="Display Name (optional)"
          value={form.displayName}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className={`text-sm ${strengthColor[passwordStrength]}`}>Password strength: {passwordStrength}</p>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          required
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="text-sm mt-6 text-center text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
      </p>
    </div>
  );
}
