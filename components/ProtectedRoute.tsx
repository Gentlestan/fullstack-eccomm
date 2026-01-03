"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/components/store/authstore";

interface Props {
  children: ReactNode;
  redirectTo?: string; // optional redirect path, default /login
}

export default function ProtectedRoute({
  children,
  redirectTo = "/login",
}: Props) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  // Ensure client-side rendering to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if not authenticated (after mount)
  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [mounted, isAuthenticated, router, redirectTo]);

  // Prevent flashing protected content before auth is ready
  if (!mounted || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
