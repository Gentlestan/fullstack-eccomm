"use client";

import { Star } from "lucide-react";
import { useTheme } from "next-themes";

interface StarRatingProps {
  rating: number; // example: 4.5
  size?: number;
}

export default function StarRating({ rating, size = 16 }: StarRatingProps) {
  const { resolvedTheme } = useTheme();

  const filledColor = resolvedTheme === "dark" ? "#FACC15" : "#EAB308"; // yellow
  const emptyColor = resolvedTheme === "dark" ? "#555" : "#ccc";

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = rating >= i + 1;
        const half = !filled && rating >= i + 0.5;

        return (
          <div key={i} className="relative">
            {/* EMPTY STAR BACKGROUND */}
            <Star size={size} color={emptyColor} />

            {/* FILLED STAR OVERLAY */}
            <Star
              size={size}
              color={filledColor}
              fill={filledColor}
              className={
                filled
                  ? "absolute top-0 left-0"
                  : half
                  ? "absolute top-0 left-0 clip-half"
                  : "hidden"
              }
            />
          </div>
        );
      })}
    </div>
  );
}
