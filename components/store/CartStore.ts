"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/types";

interface CartItem {
  product: Product;
  qty: number;
}

interface CartState {
  items: CartItem[];

  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;

  itemCount: number; // unique product count
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0, // ✅ add initial state for itemCount

      addToCart: (product) => {
        const { items } = get();
        const exists = items.find((i) => i.product.id === product.id);

        let updatedItems;
        if (exists) {
          updatedItems = items.map((i) =>
            i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
          );
        } else {
          updatedItems = [...items, { product, qty: 1 }];
        }

        set({ items: updatedItems, itemCount: updatedItems.length });
      },

      removeFromCart: (id) => {
        const updatedItems = get().items.filter((i) => i.product.id !== id);
        set({ items: updatedItems, itemCount: updatedItems.length });
      },

      increaseQty: (id) => {
        const updatedItems = get().items.map((i) =>
          i.product.id === id ? { ...i, qty: i.qty + 1 } : i
        );
        set({ items: updatedItems, itemCount: updatedItems.length });
      },

      decreaseQty: (id) => {
        const updatedItems = get()
          .items.map((i) =>
            i.product.id === id ? { ...i, qty: i.qty - 1 } : i
          )
          .filter((i) => i.qty > 0);
        set({ items: updatedItems, itemCount: updatedItems.length });
      },
    }),
    { name: "cart-store" }
  )
);
