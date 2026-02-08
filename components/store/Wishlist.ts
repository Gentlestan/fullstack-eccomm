// components/store/Wishlist.ts
import { create } from "zustand";

export interface WishlistState {
  items: number[];                  // store product IDs
  toggle: (id: number) => void;     // add/remove a product from wishlist
  isLiked: (id: number) => boolean; // check if product is in wishlist
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],

  toggle: (id: number) =>
    set((state) => ({
      items: state.items.includes(id)
        ? state.items.filter((item) => item !== id)
        : [...state.items, id],
    })),

  isLiked: (id: number) => get().items.includes(id),
}));
