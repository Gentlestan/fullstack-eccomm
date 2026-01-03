"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { colors, ThemeKey } from "@/theme";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  open: boolean;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  onClose: () => void;
}

export default function SearchOverlay({ open, query, setQuery, onClose }: Props) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.header[themeKey];

  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Focus input when overlay opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-6"
        >
          <motion.div
            ref={overlayRef}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative rounded-lg w-full max-w-md p-4"
            style={{
              backgroundColor: themeColors.bg,
              color: themeColors.text,
            }}
          >
            {/* Input + Button */}
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className={`w-full p-2 rounded-md border ${themeColors.border ?? "border-gray-300"} focus:outline-none focus:ring`}
                style={{ backgroundColor: themeColors.bg, color: themeColors.text }}
                aria-label="Search products"
              />
              <button
                onClick={handleSearch}
                className="px-3 py-2 rounded-md font-semibold"
                style={{ backgroundColor: themeColors.icon, color: themeColors.text }}
              >
                Search
              </button>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 font-bold text-xl"
              style={{ color: themeColors.text }}
              aria-label="Close search overlay"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
