"use client";

import { useState } from "react";
import { authstore } from "@/components/store/authstore";

export default function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const changePassword = authstore((state) => state.changePassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await changePassword(oldPassword, newPassword);
      alert(res?.message || "Password changed successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (err: any) {
      alert(err.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded p-4 space-y-3">
      <h2 className="font-semibold text-lg">Change Password</h2>

      <label className="block">
        Old Password
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
          placeholder="Current password"
          disabled={loading}
        />
      </label>

      <label className="block">
        New Password
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
          placeholder="New password"
          disabled={loading}
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? "Changing..." : "Change Password"}
      </button>
    </form>
  );
}
