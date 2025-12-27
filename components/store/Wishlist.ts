"use client";

import { create } from "zustand";

interface WishlistStore {
  wishlist: string[];
  toggle: (id: string) => void;
  isLiked: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  wishlist: typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("wishlist") || "[]")
    : [],

  toggle: (id: string) => {
    const current = get().wishlist;
    let updated: string[];

    if (current.includes(id)) {
      updated = current.filter(item => item !== id);
    } else {
      updated = [...current, id];
    }

    localStorage.setItem("wishlist", JSON.stringify(updated));
    set({ wishlist: updated });
  },

  isLiked: (id: string) => get().wishlist.includes(id),
}));
