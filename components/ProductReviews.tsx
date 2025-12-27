"use client";

import { Review } from "@/lib/types";
import { useTheme } from "next-themes";
import { colors, ThemeKey } from "@/theme";

interface Props {
  reviews: Review[];
}

export default function ProductReviews({ reviews }: Props) {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.product[themeKey];

  if (reviews.length === 0) {
    return (
      <p className={`mt-6 ${themeColors.text} opacity-70`}>
        No reviews yet.
      </p>
    );
  }

  return (
    <div className={`mt-12 max-w-6xl mx-auto px-4 mb-8`}>
      <h2 className={`text-xl font-bold mb-4 ${themeColors.text}`}>Reviews</h2>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className={`rounded-lg p-4 ${themeColors.cardBg} ${themeColors.border}`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className={`font-semibold ${themeColors.text}`}>
                {r.username}
              </span>

              <span className="text-yellow-500">{r.rating}★</span>
            </div>

            <p className={`${themeColors.text} opacity-80`}>
              {r.comment}
            </p>

            <span className="text-xs opacity-50">{r.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
