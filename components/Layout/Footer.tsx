"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Facebook, Linkedin, Mail, Instagram, Twitter } from "lucide-react";
import { colors, ThemeKey } from "@/theme";

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const themeKey: ThemeKey = (resolvedTheme as ThemeKey) ?? "light";
  const themeColors = colors.footer[themeKey];

  return (
    <footer
      className={`w-full transition-colors duration-300 ${themeColors.bg} ${themeColors.text} ${themeColors.shadow}`}
    >
      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-4 pb-52 pt-22 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Branding */}
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">Ecommerce</span>
          <p className="text-sm mt-2">
            Trusted by thousands of happy customers worldwide.
          </p>
        </div>

        {/* Shop Links */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">Shop</h4>
          <Link href="/products" className={themeColors.link}>All Products</Link>
          <Link href="#" className={themeColors.link}>Categories</Link>
          <Link href="/" className={themeColors.link}>New Arrivals</Link>
          <Link href="/sale" className={themeColors.link}>Sale</Link>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">Support</h4>
          <Link href="/faq" className={themeColors.link}>FAQ</Link>
          <Link href="/shipping" className={themeColors.link}>Shipping Info</Link>
          <Link href="/returns" className={themeColors.link}>Returns & Refunds</Link>
          <Link href="/contact" className={themeColors.link}>Contact Us</Link>
        </div>

        {/* Newsletter + Social */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold">Subscribe to our newsletter</h4>

          <form className="flex w-full">
            <input
              type="email"
              placeholder="Your email"
              className={`${themeColors.inputBg} p-2 rounded-l-md border border-gray-300 focus:outline-none flex-1`}
            />
            <button
              type="submit"
              className={`${themeColors.buttonPrimary} px-4 rounded-r-md`}
            >
              Subscribe
            </button>
          </form>

          <div className="flex gap-4 mt-4">
            <Link href="https://facebook.com" target="_blank" className={themeColors.icon}>
              <Facebook />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className={themeColors.icon}>
              <Linkedin />
            </Link>
            <Link href="https://instagram.com" target="_blank" className={themeColors.icon}>
              <Instagram />
            </Link>
            <Link href="https://twitter.com" target="_blank" className={themeColors.icon}>
              <Twitter />
            </Link>
            <Link
              href="mailto:info@ecommerce.com"
              className={themeColors.icon}
            >
              <Mail />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Ecommerce. All rights reserved.
          </span>

          <div className="flex gap-4 text-sm">
            <Link href="/privacy" className={themeColors.link}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={themeColors.link}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
