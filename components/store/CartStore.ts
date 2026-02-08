"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/types";
import { BASE_URL } from "@/lib/api";
import { authstore } from "@/components/store/authstore";

/* ============================
   Types
============================ */

export interface CartProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string; // full URL from API
  stock: number;
}

export interface CartItem {
  id: number; // CartItem ID from backend
  product: CartProduct;
  qty: number;
}

interface CartState {
  items: CartItem[];
  totalQty: number;
  totalPrice: number;

  fetchCart: () => Promise<void>;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  updateQty: (cartItemId: number, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  clearCart: () => void;
}

/* ============================
   Helpers
============================ */

function getAuthHeaders(): HeadersInit {
  const token = authstore.getState().accessToken;
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

function normalizeProductFromBackend(item: any): CartItem {
  return {
    id: item.id,
    qty: item.qty,
    product: {
      id: item.product,
      name: item.product_name,
      slug: item.product_slug || "",
      price: Number(item.product_price),
      image: item.product_image ?? "/assets/images/placeholder.png",
      stock: Number(item.product_stock ?? 999),
    },
  };
}

/* ============================
   Cart Store
============================ */

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalQty: 0,
      totalPrice: 0,

      /* --------------------
         Fetch cart
      -------------------- */
      fetchCart: async () => {
        const token = authstore.getState().accessToken;
        if (!token) {
          set({ items: [], totalQty: 0, totalPrice: 0 });
          return;
        }

        try {
          const res = await fetch(`${BASE_URL}/cart/`, {
            headers: getAuthHeaders(),
          });

          if (res.status === 401) {
            console.warn("Unauthorized — token may be missing or expired");
            set({ items: [], totalQty: 0, totalPrice: 0 });
            return;
          }

          if (!res.ok) {
            console.error(`Failed to fetch cart. Status: ${res.status}`);
            return;
          }

          const data = await res.json();
          set({
            items: data.items.map(normalizeProductFromBackend),
            totalQty: data.totalQty,
            totalPrice: Number(data.totalPrice),
          });
        } catch (err) {
          console.error("Fetch cart error:", err);
          set({ items: [], totalQty: 0, totalPrice: 0 });
        }
      },

      /* --------------------
         Add to cart
      -------------------- */
      addToCart: async (product: Product, quantity = 1) => {
        const token = authstore.getState().accessToken;
        if (!token) return;

        try {
          const res = await fetch(`${BASE_URL}/cart/add/`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ product_id: product.id, quantity }),
          });

          if (!res.ok) {
            console.error(`Failed to add to cart. Status: ${res.status}`);
            return;
          }

          await get().fetchCart();
        } catch (err) {
          console.error("Add to cart error:", err);
        }
      },

      /* --------------------
         Update cart quantity
      -------------------- */
      updateQty: async (cartItemId: number, quantity: number) => {
        const token = authstore.getState().accessToken;
        if (!token) return;

        try {
          const res = await fetch(`${BASE_URL}/cart/${cartItemId}/update/`, {
            method: "PATCH",
            headers: getAuthHeaders(),
            body: JSON.stringify({ quantity }),
          });

          if (!res.ok) {
            console.error(`Failed to update cart item. Status: ${res.status}`);
            return;
          }

          await get().fetchCart();
        } catch (err) {
          console.error("Update qty error:", err);
        }
      },

      /* --------------------
         Remove from cart
      -------------------- */
      removeFromCart: async (cartItemId: number) => {
        const token = authstore.getState().accessToken;
        if (!token) return;

        try {
          const res = await fetch(`${BASE_URL}/cart/${cartItemId}/remove/`, {
            method: "DELETE",
            headers: getAuthHeaders(),
          });

          if (!res.ok) {
            console.error(`Failed to remove cart item. Status: ${res.status}`);
            return;
          }

          await get().fetchCart();
        } catch (err) {
          console.error("Remove cart item error:", err);
        }
      },

      /* --------------------
         Clear frontend cart
      -------------------- */
      clearCart: () => set({ items: [], totalQty: 0, totalPrice: 0 }),
    }),
    { name: "cart-store" }
  )
);
