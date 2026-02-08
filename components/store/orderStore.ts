"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authstore } from "@/components/store/authstore";
import { Order, CreateOrderPayload } from "@/lib/types";

interface OrdersState {
  orders: Order[];
  loading: boolean;
  pollingIntervalId?: number;

  addOrUpdateOrder: (order: Order) => void;
  setOrders: (orders: Order[]) => void;
  fetchOrders: () => Promise<void>;
  createOrder: (payload: CreateOrderPayload) => Promise<Order>;
  startPolling: (intervalMs?: number) => void;
  stopPolling: () => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      loading: false,
      pollingIntervalId: undefined,

      addOrUpdateOrder: (order) => {
        set((state) => {
          const safeOrders = Array.isArray(state.orders) ? state.orders : [];
          const index = safeOrders.findIndex((o) => o.id === order.id);

          if (index >= 0) {
            const updated = [...safeOrders];
            updated[index] = order;
            return { orders: updated };
          }

          return { orders: [...safeOrders, order] };
        });
      },

      setOrders: (orders) => {
        set({ orders: Array.isArray(orders) ? orders : [] });
      },

      fetchOrders: async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!API_URL) return;

        const authFetch = authstore.getState().authFetch;
        if (!authFetch) return;

        set({ loading: true });

        try {
          const res = await authFetch(`${API_URL}/orders/my-orders/`);
          if (!res.ok) throw new Error("Failed to fetch orders");

          const data = await res.json();
          const ordersArray = Array.isArray(data.results) ? data.results : [];

          const normalizedOrders: Order[] = ordersArray.map((o: any) => ({
            id: o.id,
            items: Array.isArray(o.items)
              ? o.items.map((i: any) => ({
                  product_id: String(i.product.id),
                  name: i.product.name,
                  price: Number(i.price ?? 0),
                  quantity: Number(i.quantity ?? 0),
                }))
              : [],
            total_amount: Number(o.total_price ?? 0),
            status: o.status ?? "pending",
            created_at: o.created_at ?? new Date().toISOString(),
            shipping_address: "",
            processing_at: o.processing_at ?? null,
            shipped_at: o.shipped_at ?? null,
            delivered_at: o.delivered_at ?? null,
            cancelled_at: o.cancelled_at ?? null,
          }));

          set({ orders: normalizedOrders });
        } catch (err) {
          console.error("[OrdersStore] fetchOrders error:", err);
        } finally {
          set({ loading: false });
        }
      },

      createOrder: async (payload) => {
        const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!API_URL) throw new Error("API base URL not defined");

        const authFetch = authstore.getState().authFetch;
        if (!authFetch) throw new Error("authFetch not found");

        try {
          const res = await authFetch(`${API_URL}/orders/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items: payload.items.map((i) => ({
                product_id: Number(i.product_id),
                quantity: Number(i.quantity),
              })),
            }),
          });

          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.detail || "Order creation failed");
          }

          const data = await res.json();

          const newOrder: Order = {
            id: data.id,
            items: Array.isArray(data.items)
              ? data.items.map((i: any) => ({
                  product_id: String(i.product.id),
                  name: i.product.name,
                  price: Number(i.price ?? 0),
                  quantity: Number(i.quantity ?? 0),
                }))
              : [],
            total_amount: Number(data.total_price ?? 0),
            status: data.status ?? "pending",
            created_at: data.created_at ?? new Date().toISOString(),
            shipping_address: "",
            processing_at: data.processing_at ?? null,
            shipped_at: data.shipped_at ?? null,
            delivered_at: data.delivered_at ?? null,
            cancelled_at: data.cancelled_at ?? null,
          };

          // Optimistic update: show immediately
          get().addOrUpdateOrder(newOrder);

          // Fetch backend after 2s to sync status
          setTimeout(() => get().fetchOrders(), 2000);

          return newOrder;
        } catch (err: any) {
          console.error("[OrdersStore] createOrder error:", err.message || err);
          throw err;
        }
      },

      startPolling: (intervalMs = 5000) => {
        get().stopPolling();
        const id = window.setInterval(() => {
          get().fetchOrders();
        }, intervalMs);
        set({ pollingIntervalId: id });
      },

      stopPolling: () => {
        if (get().pollingIntervalId) {
          window.clearInterval(get().pollingIntervalId);
          set({ pollingIntervalId: undefined });
        }
      },
    }),
    {
      name: "orders-store",
      version: 2,
      partialize: (state) => ({
        orders: Array.isArray(state.orders) ? state.orders : [],
        loading: false,
      }),
      migrate: (persistedState: any) => ({
        orders: Array.isArray(persistedState?.orders) ? persistedState.orders : [],
        loading: false,
      }),
    }
  )
);