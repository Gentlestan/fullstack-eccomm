"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Product } from "@/lib/types";
import AddToCartButton from "./AddToCartButton";
import { useTheme } from "next-themes";
import { colors, ThemeKey, ProductTheme } from "@/theme";

interface Props {
  product: Product;
  themeColors?: ProductTheme; // fixed typo
}

export default function ProductDetail({ product, themeColors }: Props) {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";

  // Use passed themeColors or fallback to default theme
  const colorsToUse: ProductTheme = themeColors || colors.product[themeKey];

  const stockCount = Number(product.stock) || 0;
  const isOutOfStock = stockCount <= 0;
  const images = product.images?.length ? product.images : ["/placeholder.png"];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const increaseQty = () => setQuantity((q) => Math.min(q + 1, stockCount));
  const decreaseQty = () => setQuantity((q) => Math.max(q - 1, 1));

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(Number(product.price) || 0);

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 ${colorsToUse.bg} ${colorsToUse.text}`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* LEFT - IMAGES */}
        <div className="md:col-span-6">
          <div className="border rounded-lg p-2">
            <Image
              ref={imageRef}
              src={images[selectedImage]}
              alt={product.name}
              width={500}
              height={500}
              priority
              className="rounded-lg object-cover w-full h-full"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  aria-label={`View image ${idx + 1}`}
                  onClick={() => setSelectedImage(idx)}
                  className={`border rounded-md p-1 transition ${
                    selectedImage === idx ? "border-blue-500" : "border-gray-300"
                  }`}
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded overflow-hidden relative">
                    <Image src={img} alt={`${product.name}-${idx}`} fill className="object-cover" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT - PRODUCT INFO */}
        <div className="md:col-span-6 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-lg font-semibold">{formattedPrice}</p>

          {isOutOfStock ? (
            <span className="text-red-600 font-semibold">Out of stock</span>
          ) : (
            <span className="text-sm text-green-600">In stock ({stockCount})</span>
          )}

          <p className="text-sm leading-relaxed">{product.description}</p>

          <div className="text-sm space-y-1 opacity-80">
            <p>🚚 Delivery: 2–5 business days</p>
            <p>🔁 7-day return policy</p>
            <p>🛡️ 12-month warranty</p>
            <p>✅ 100% original gadgets</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mt-2">
            <button
              aria-label="Decrease quantity"
              onClick={decreaseQty}
              disabled={quantity === 1 || isOutOfStock}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              −
            </button>
            <span className="min-w-6 text-center">{quantity}</span>
            <button
              aria-label="Increase quantity"
              onClick={increaseQty}
              disabled={quantity === stockCount || isOutOfStock}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              +
            </button>
          </div>

          {/* Add to Cart */}
          <AddToCartButton
            product={product}
            buttonClass={colorsToUse.addToCart}
            imageRef={imageRef}
            fullWidth={false}
            disabled={isOutOfStock}
          />
        </div>
      </div>

      {/* MOBILE STICKY CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden p-4 shadow-lg bg-white dark:bg-black">
        <AddToCartButton
          product={product}
          buttonClass={colorsToUse.addToCart}
          fullWidth
          disabled={isOutOfStock}
        />
      </div>
    </div>
  );
}
