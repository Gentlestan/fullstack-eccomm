"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

interface Props {
  count: number;
}

export default function WishlistIcon({ count }: Props) {
  return (
    <Link href="/wishlist" className="relative">
      <Heart className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
