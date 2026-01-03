"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuthStore } from "@/components/store/authstore";

export default function AccountPage() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return <p className="p-6">Loading account...</p>;
  }

  return (
    <ProtectedRoute>
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">My Account</h1>

        <div className="space-y-2">
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Role:</strong> {user?.role}
          </p>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          This page is backend-ready. Data will be fetched from API.
        </p>
      </main>
    </ProtectedRoute>
  );
}
