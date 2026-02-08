"use client";

import { useState, useMemo } from "react";
import { Review } from "@/lib/types";
import { useTheme } from "next-themes";
import { colors, ThemeKey } from "@/theme";
import { authstore } from "@/components/store/authstore";
import { BASE_URL } from "@/lib/api";

interface Props {
  reviews: Review[];
  productId: number;
}

export default function ProductReviews({ reviews, productId }: Props) {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.product[themeKey];

  // ✅ Safely read auth state from Zustand
  const user = authstore((state) => state.user);
  const accessToken = authstore((state) => state.accessToken);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Prevent unnecessary re-renders by memoizing reviews
  const memoizedReviews = useMemo(() => reviews, [reviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !accessToken) {
      setErrorMsg("You must be logged in to submit a review.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch(`${BASE_URL}/products/${productId}/reviews/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ rating, comment }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.detail || "Failed to submit review");
      }

      setSuccessMsg("Review submitted successfully! Pending admin approval.");
      setComment("");
      setRating(5);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 max-w-6xl mx-auto px-4 mb-8">
      <h2 className={`text-xl font-bold mb-4 ${themeColors.text}`}>Reviews</h2>

      {memoizedReviews.length === 0 && (
        <p className={`mt-6 ${themeColors.text} opacity-70`}>No reviews yet.</p>
      )}

      <div className="space-y-4 mb-6">
        {memoizedReviews.map((r) => (
          <div
            key={r.id}
            className={`rounded-lg p-4 ${themeColors.cardBg} ${themeColors.border}`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className={`font-semibold ${themeColors.text}`}>
                {r.user_display_name || "Anonymous"}
              </span>
              <span className="text-yellow-500">{r.rating}★</span>
            </div>
            <p className={`${themeColors.text} opacity-80`}>{r.comment}</p>
            <span className="text-xs opacity-50">{r.date}</span>
          </div>
        ))}
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <h3 className={`font-semibold ${themeColors.text}`}>Add a Review</h3>

          <div>
            <label className={`block mb-1 ${themeColors.text}`}>Rating</label>
            <select
              className="border rounded px-2 py-1 w-24"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block mb-1 ${themeColors.text}`}>Comment</label>
            <textarea
              className="border rounded w-full px-2 py-1"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
          {successMsg && <p className="text-green-500 text-sm">{successMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      ) : (
        <p className={`${themeColors.text} opacity-70`}>
          You must be logged in to submit a review.
        </p>
      )}
    </div>
  );
}
