"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import OrdersSkeleton from "@/components/skeletons/OrderSkeleton";
import { useOrdersStore } from "@/components/store/orderStore";
import { useTheme } from "next-themes";
import { colors, ThemeKey } from "@/theme";

export default function OrdersPage() {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";

  const cardColors = colors.product[themeKey];
  const pageColors = colors.header[themeKey];

  const orders = useOrdersStore((state) => state.orders);
  const loadingStore = useOrdersStore((state) => state.loading);
  const fetchOrders = useOrdersStore((state) => state.fetchOrders);
  const startPolling = useOrdersStore((state) => state.startPolling);
  const stopPolling = useOrdersStore((state) => state.stopPolling);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      await fetchOrders();
      setLoading(false);
    };

    loadOrders();
    startPolling(5000); // Poll every 5 seconds

    return () => stopPolling();
  }, [fetchOrders, startPolling, stopPolling]);

  return (
    <ProtectedRoute>
      <main className={`max-w-4xl mx-auto p-6 ${pageColors.bg} ${pageColors.text} space-y-6 mt-6 mb-6`}>
        <h1 className="text-2xl font-semibold mb-4">My Orders</h1>

        {(loading || loadingStore) ? (
          <OrdersSkeleton />
        ) : orders.length === 0 ? (
          <div className={`border rounded p-4 ${cardColors.bg} ${cardColors.text}`}>
            No orders yet.
          </div>
        ) : (
          orders
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .map((order) => (
              <div key={order.id} className={`border rounded p-4 flex flex-col space-y-2 ${cardColors.bg} ${cardColors.text}`}>
                <div className="flex justify-between font-medium">
                  <span>Order ID: {order.id ?? "N/A"}</span>
                  <span>Status: {order.status ?? "Pending"}</span>
                </div>
                <div>Total Amount: ₦{(order.total_amount ?? 0).toFixed(2)}</div>
                <div>
                  Items:
                  <ul className="ml-4 list-disc">
                    {(order.items ?? []).map((item) => (
                      <li key={item.product_id}>{item.name ?? "Unknown"} × {item.quantity ?? 0} (₦{(item.price ?? 0).toFixed(2)})</li>
                    ))}
                  </ul>
                </div>
                <div>Shipping: {order.shipping_address ?? "N/A"}</div>
                <div className="text-sm text-gray-400">
                  Created at: {order.created_at ? new Date(order.created_at).toLocaleString() : "Unknown"}
                </div>
                <div className="text-xs text-gray-500">
                  {order.processing_at && <div>Processing: {new Date(order.processing_at).toLocaleString()}</div>}
                  {order.shipped_at && <div>Shipped: {new Date(order.shipped_at).toLocaleString()}</div>}
                  {order.delivered_at && <div>Delivered: {new Date(order.delivered_at).toLocaleString()}</div>}
                  {order.cancelled_at && <div>Cancelled: {new Date(order.cancelled_at).toLocaleString()}</div>}
                </div>
              </div>
            ))
        )}
        {!loading && orders.length > 0 && (
          <p className="mt-6 text-sm text-gray-500">
            Orders are synced with the backend and update automatically.
          </p>
        )}
      </main>
    </ProtectedRoute>
  );
}