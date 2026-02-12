// pages/verify-email/[uid]/[token].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`;


export default function VerifyEmailPage() {
  const router = useRouter();
  const { uid, token } = router.query as { uid?: string; token?: string };

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!uid || !token) return;

      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/verify-email/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid, token }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Invalid or expired link");
        }

        setMessage(data.message || "Email verified successfully!");
        setTimeout(() => {
          router.push("/login"); // redirect to login after 3 seconds
        }, 3000);
      } catch (err: any) {
        setError(err?.message || "Verification failed");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [uid, token, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        {loading && <p className="text-gray-700 dark:text-gray-200">Verifying your email...</p>}
        {message && <p className="text-green-600 dark:text-green-400">{message}</p>}
        {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
        {!loading && message && (
          <p className="mt-2 text-sm text-gray-500">Redirecting to login...</p>
        )}
      </div>
    </div>
  );
}
