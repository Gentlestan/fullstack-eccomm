"use client";

import { useAuthStore } from "@/components/store/authstore";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function OrdersPage() {
  const { isLoading } = useAuthStore();

  if (isLoading) {
    return <p className="p-6">Loading orders...</p>;
  }

  return (
    <ProtectedRoute>
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">My Orders</h1>

        <div className="border rounded p-4 text-gray-500">
          No orders yet.
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Orders will be fetched from backend API.
        </p>
      </main>
    </ProtectedRoute>
  );
}
