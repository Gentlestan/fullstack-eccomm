"use client";

import { useState } from "react";
import { authstore } from "@/components/store/authstore";

interface Props {
  user: {
    id: number;
    email: string;
    displayName?: string;
    role?: "user" | "admin";
  };
}

export default function EditProfileForm({ user }: Props) {
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [loading, setLoading] = useState(false);

  const updateProfile = authstore((state) => state.updateProfile);
  const fetchUser = authstore((state) => state.fetchUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) return alert("Display Name cannot be empty");

    try {
      setLoading(true);
      await updateProfile(displayName.trim()); // update backend
      await fetchUser(); // refresh store
      alert("Profile updated successfully");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded p-4 space-y-4">
      <h2 className="text-lg font-semibold">Edit Profile</h2>

      <div className="flex flex-col">
        <label htmlFor="displayName" className="font-medium mb-1">
          Display Name
        </label>
        <input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="border rounded p-2"
          placeholder="Enter display name"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
}
