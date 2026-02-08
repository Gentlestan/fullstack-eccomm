"use client";

import { useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { authstore } from "@/components/store/authstore";
import AccountInfo from "@/components/account/AccountInfo";
import EditProfileForm from "@/components/account/EditProfileForm";
import ChangePasswordForm from "@/components/account/ChangePasswordForm";
import DeleteAccountButton from "./DeleteAccountButton";
import AccountSkeleton from "@/components/skeletons/AccountSkeleton";

export default function AccountPage() {
  const { user, fetchUser, isLoading } = authstore();

  // Fetch user on mount
  useEffect(() => {
    if (!user) fetchUser();
  }, [user, fetchUser]);

  if (isLoading || !user) {
    return (
      <ProtectedRoute>
        <AccountSkeleton />
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">My Account</h1>

        {/* Display user info */}
        <AccountInfo user={user} />

        {/* Edit profile */}
        <EditProfileForm user={user} />

        {/* Change password */}
        <ChangePasswordForm />

        {/* Delete account */}
        <DeleteAccountButton />
      </main>
    </ProtectedRoute>
  );
}
