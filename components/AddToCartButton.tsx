"use client";

import { ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types";
import { useCartStore } from "./store/CartStore";
import { RefObject } from "react";

interface Props {
  product: Product;
  buttonClass?: string;
  imageRef?: RefObject<HTMLImageElement | null>;
  cartRef?: RefObject<HTMLDivElement | null>; // optional on purpose
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function AddToCartButton({
  product,
  buttonClass,
  imageRef,
  cartRef,
  fullWidth,
  disabled,
}: Props) {
  const addToCart = useCartStore((s) => s.addToCart);

  const stockCount = Number(product.stock) || 0;
  const finalDisabled = disabled ?? stockCount <= 0;

  function handleAddToCart() {
    if (finalDisabled) return;

    addToCart(product);

    const img = imageRef?.current;

    // 🔥 CRITICAL FIX: ref OR DOM fallback
    const cartIcon =
      cartRef?.current ??
      (document.getElementById("cart-icon") as HTMLDivElement | null);

    if (!img || !cartIcon) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const clone = img.cloneNode(true) as HTMLImageElement;
    clone.style.position = "fixed";
    clone.style.left = `${imgRect.left}px`;
    clone.style.top = `${imgRect.top}px`;
    clone.style.width = `${imgRect.width}px`;
    clone.style.height = `${imgRect.height}px`;
    clone.style.borderRadius = "8px";
    clone.style.pointerEvents = "none";
    clone.style.zIndex = "9999";
    clone.style.transition =
      "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s";

    document.body.appendChild(clone);

    const deltaX =
      cartRect.left +
      cartRect.width / 2 -
      (imgRect.left + imgRect.width / 2);
    const deltaY =
      cartRect.top +
      cartRect.height / 2 -
      (imgRect.top + imgRect.height / 2);

    requestAnimationFrame(() => {
      clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.2)`;
      clone.style.opacity = "0";
    });

    clone.addEventListener("transitionend", () => clone.remove());
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={finalDisabled}
      className={`
        flex items-center justify-center gap-2 px-4 py-2 rounded-lg
        ${buttonClass || "bg-blue-500 text-white"}
        ${fullWidth ? "w-full" : "w-auto"}
        ${finalDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        transition duration-150
      `}
    >
      <ShoppingCart className="w-4 h-4" />
      Add
    </button>
  );
}
