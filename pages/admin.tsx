// pages/admin.tsx
"use client";

import { useAuthStore } from "@/components/store/authstore";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminPage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  // Redirect non-admin or unauthenticated users
  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/"); // redirect to home
    }
  }, [isAuthenticated, user, router]);

  // While redirecting or loading
  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-700 dark:text-gray-300">
        This is a placeholder admin page. You can add your admin features here once the backend is ready.
      </p>
    </main>
  );
}
