"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { RefObject } from "react";

interface Props {
  count: number;
  refProp?: RefObject<HTMLDivElement | null>;
  isAuthenticated: boolean;
}

export default function CartIcon({ count, refProp, isAuthenticated }: Props) {
  return (
    <Link href={isAuthenticated ? "/cart" : "/login"} className="relative">
      <div ref={refProp}>
        <ShoppingCart className="w-5 h-5" />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {count}
          </span>
        )}
      </div>
    </Link>
  );
}
