"use client";
import { AuthUser } from "@/lib/types";

interface Props {
  user: AuthUser;
}

export default function AccountInfo({ user }: Props) {
  return (
    <div className="border rounded p-4 space-y-2">
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>Display Name:</strong> {user.displayName || "-"}
      </p>
      <p>
        <strong>Role:</strong> {user?.role || "user"}
      </p>
    </div>
  );
}
