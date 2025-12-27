"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { colors, ThemeKey } from "@/theme";
import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export interface Promo {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
}

export default function PromoCarousel() {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const theme = colors.product[themeKey];

  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);

  // Load promos
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/promo");
        const data = (await res.json()) as Promo[];
        setPromos(data || []);
      } catch (err) {
        console.error("Failed to load promos", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /** Skeleton Loader */
  if (loading) {
    return (
      <section className="mt-8 px-6 md:px-10 max-w-7xl mx-auto">
        <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${theme.text}`}>
          Top Deals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-48 rounded-lg ${theme.cardBg} animate-pulse`} />
          ))}
        </div>
      </section>
    );
  }

  if (!promos.length) return null;

  return (
    <section
      className={`mt-8 px-6 md:px-10 max-w-7xl mx-auto 
      ${theme.bg} ${theme.text} rounded-md pb-6`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-bold">Top Deals</h2>
      </div>

      {/* ===== Swiper Carousel ===== */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="group"
      >
        {promos.map((promo) => (
          <SwiperSlide key={promo.id}>
            <Link
              href={promo.link || "#"}
              className="relative overflow-hidden rounded-lg block 
              h-52 sm:h-56 md:h-60 lg:h-64 transition-all duration-500
              hover:scale-[1.02] hover:shadow-xl"
            >
              <Image
                src={promo.image}
                alt={promo.title}
                fill
                className="object-cover"
                sizes="100vw"
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 ${
                  themeKey === "dark" ? "bg-black/40" : "bg-black/25"
                } flex flex-col justify-end p-4`}
              >
                <h3 className="text-white font-semibold text-lg">
                  {promo.title}
                </h3>
                {promo.subtitle && (
                  <p className="text-white text-sm opacity-90 mt-1">
                    {promo.subtitle}
                  </p>
                )}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
