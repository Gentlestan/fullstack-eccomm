// pages/admin.tsx
"use client";

import { useAuthStore } from "@/components/store/authstore";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminPage() {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
      router.replace("/"); // redirect to home
    }
  }, [isAuthenticated, isLoading, user, router]);

  // Show loading state while auth is being determined
  if (isLoading || !isAuthenticated || user?.role !== "admin") {
    return <p className="p-6">Loading admin dashboard...</p>;
  }

  return (
    <ProtectedRoute>
      <main className="p-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-700 dark:text-gray-300">
          This is a placeholder admin page. Admin features will be implemented once the backend is ready.
        </p>
      </main>
    </ProtectedRoute>
  );
}
