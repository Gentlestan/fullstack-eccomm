import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/components/store/authstore";

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <p className="p-6">Loading orders...</p>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">My Orders</h1>

      <div className="border rounded p-4 text-gray-500">
        No orders yet.
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Orders will be fetched from backend API.
      </p>
    </main>
  );
}
