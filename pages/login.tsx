"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/components/store/authstore";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-2">Login</h1>

        <p className="text-gray-500 mb-6">
          Authentication will be connected by the backend team.
        </p>

        {/* Placeholder form */}
        <form className="flex flex-col gap-4">
          <input
            disabled
            placeholder="Email"
            className="p-2 border rounded bg-gray-100 cursor-not-allowed"
          />
          <input
            disabled
            placeholder="Password"
            type="password"
            className="p-2 border rounded bg-gray-100 cursor-not-allowed"
          />

          <button
            disabled
            className="w-full py-2 rounded bg-gray-300 text-gray-600 cursor-not-allowed"
          >
            Login (Coming Soon)
          </button>
        </form>

        {/* Dev note */}
        <p className="text-xs text-gray-400 mt-4">
          Backend will integrate <code>/api/auth/login</code>
        </p>
      </div>
    </div>
  );
}
