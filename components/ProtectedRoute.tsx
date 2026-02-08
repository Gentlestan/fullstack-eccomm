"use client"; // safe to keep, ignored in pages router

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router"; // ✅ IMPORTANT
import { authstore } from "@/components/store/authstore";
import PageSkeleton from "@/components/skeletons/PageSkeleton";

interface Props {
  children: ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  redirectTo = "/login",
}: Props) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = authstore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isLoading, isAuthenticated, router, redirectTo]);

  // 🔹 Show skeleton while auth is resolving
  if (isLoading) {
    return <PageSkeleton />;
  }

  // 🔹 Prevent protected content flash
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
