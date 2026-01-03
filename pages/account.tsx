import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/components/store/authstore";

export default function AccountPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <p className="p-6">Loading account...</p>;
  }

  if (!isAuthenticated) {
    return null; // prevents flash before redirect
  }

  return (
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
  );
}
