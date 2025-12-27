"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { HeroData, Product } from "@/lib/types";
import { colors, ThemeKey } from "@/theme";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "./store/CartStore";

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<HeroData[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const hoverRef = useRef(false);

  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.hero[themeKey];

  const { addToCart } = useCartStore();

  // Mount check
  useEffect(() => setMounted(true), []);

  // Load hero items
  useEffect(() => {
    async function loadHero() {
      const res = await fetch("/api/hero");
      const json = await res.json();
      setItems(json);
      setLoading(false);
    }
    loadHero();
  }, []);

  // Auto-rotate slider every 7s
  useEffect(() => {
    if (hoverRef.current) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 7000);
    return () => clearInterval(id);
  }, [items.length]);

  if (!mounted) return null;

  if (loading || items.length === 0) {
    return (
      <section className={`py-10 text-center ${themeColors.text}`}>
        <p className={themeColors.subtitle}>Loading hero...</p>
      </section>
    );
  }

  const data = items[index];

  // Add to cart
  const handleAddToCart = async (slug: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${slug}`);
      if (!res.ok) throw new Error("Product not found");
      const product: Product = await res.json();
      addToCart(product);
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  return (
    <section
      className={`relative font-roboto mt-4 flex flex-col md:flex-row items-center gap-6 px-6 md:px-8 py-6 mx-auto max-w-6xl ${themeColors.bg} ${themeColors.text}`}
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      {/* IMAGE CONTAINER */}
      <div className="flex-1 relative flex justify-center order-1 md:order-2 w-full md:max-w-md">
        <img
          src={data.image}
          alt="Hero"
          className="w-full rounded-xl shadow-lg object-cover"
        />

        {/* Left Arrow */}
        <button
          onClick={() => setIndex((prev) => (prev - 1 + items.length) % items.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 rounded-full hover:bg-black/50"
        >
          <ChevronLeft className="text-white" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => setIndex((prev) => (prev + 1) % items.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 rounded-full hover:bg-black/50"
        >
          <ChevronRight className="text-white" />
        </button>

        {/* DOTS */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${i === index ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      </div>

      {/* TEXT CONTAINER */}
      <div className="flex-1 space-y-4 text-left order-2 md:order-1">
        <h1 className="text-3xl md:text-4xl font-bold">{data.title}</h1>
        <p className={`text-sm md:text-base mb-6 ${themeColors.subtitle}`}>
          {data.subtitle}
        </p>

        <div className="flex gap-4 flex-wrap">
          <Link
            href={`/products/${data.readMore.slug}`}
            className={`px-4 py-2 md:px-6 md:py-3 rounded-lg ${themeColors.buttonPrimary}`}
          >
            {data.readMore.label}
          </Link>

          <button
            onClick={() => handleAddToCart(data.addToCart.slug)}
            className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg ${themeColors.buttonSecondary}`}
          >
            <ShoppingCart className="w-5 h-5" />
            {data.addToCart.label}
          </button>
        </div>
      </div>
    </section>
  );
}
