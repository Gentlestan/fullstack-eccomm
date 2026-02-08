"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { Product } from "@/lib/types";
import AddToCartButton from "./AddToCartButton";
import { useTheme } from "next-themes";
import { colors, ThemeKey, ProductTheme } from "@/theme";
import { useCartContext } from "./CartContext";
import { getImageAt } from "@/lib/utils";

interface Props {
  product: Product;
  themeColors?: ProductTheme;
}

export default function ProductDetail({ product, themeColors }: Props) {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const colorsToUse: ProductTheme = themeColors || colors.product[themeKey];

  const stockCount = Number(product.stock) || 0;
  const isOutOfStock = stockCount <= 0;

  // ✅ Use getImageAt helper safely
  const images: string[] = product.images && product.images.length > 0
    ? product.images.map((_, idx) => getImageAt(product.images!, idx))
    : ["/placeholder.png"];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const imageWrapperRef = useRef<HTMLDivElement | null>(null);

  const increaseQty = () => setQuantity((q) => Math.min(q + 1, stockCount));
  const decreaseQty = () => setQuantity((q) => Math.max(q - 1, 1));

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(Number(product.price) || 0);

  const { cartRef } = useCartContext();
  const x = useMotionValue(0); // for drag

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 ${colorsToUse.bg} ${colorsToUse.text}`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* LEFT — IMAGES */}
        <div className="md:col-span-6">
          <div ref={imageWrapperRef} className="border rounded-lg p-2 relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={images[selectedImage]}
                src={images[selectedImage]}
                alt={product.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg object-cover w-full h-full"
              />
            </AnimatePresence>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <motion.div
              className="flex gap-2 mt-4 overflow-x-auto md:overflow-visible cursor-grab"
              drag="x"
              dragConstraints={{ left: -1000, right: 0 }}
              style={{ x }}
              whileTap={{ cursor: "grabbing" }}
            >
              {images.map((img, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`border rounded-md p-1 flex-shrink-0 ${
                    selectedImage === idx ? "border-blue-500" : "border-gray-300"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  layout
                >
                  <motion.div className="w-20 h-20 md:w-24 md:h-24 relative overflow-hidden rounded-md" layout>
                    <motion.img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className={`w-full h-full object-cover ${
                        selectedImage === idx ? "ring-2 ring-blue-500" : ""
                      }`}
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>

        {/* RIGHT — PRODUCT INFO */}
        <div className="md:col-span-6 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-lg font-semibold">{formattedPrice}</p>
          {isOutOfStock ? (
            <span className="text-red-600 font-semibold">Out of stock</span>
          ) : (
            <span className="text-sm text-green-600">In stock ({stockCount})</span>
          )}
          <p className="text-sm leading-relaxed">{product.description}</p>

          {/* Quantity */}
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={decreaseQty}
              disabled={quantity === 1 || isOutOfStock}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              −
            </button>
            <span>{quantity}</span>
            <button
              onClick={increaseQty}
              disabled={quantity === stockCount || isOutOfStock}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              +
            </button>
          </div>

          <AddToCartButton
            product={product}
            buttonClass={colorsToUse.addToCart}
            imageRef={imageWrapperRef}
            cartRef={cartRef}
            disabled={isOutOfStock}
          />
        </div>
      </div>

      {/* MOBILE CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden p-4 bg-white dark:bg-black">
        <AddToCartButton
          product={product}
          buttonClass={colorsToUse.addToCart}
          imageRef={imageWrapperRef}
          cartRef={cartRef}
          fullWidth
          disabled={isOutOfStock}
        />
      </div>
    </div>
  );
}
