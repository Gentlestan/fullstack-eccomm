"use client";

import { useEffect } from "react";
import { useOrdersStore } from "@/components/store/orderStore";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useTheme } from "next-themes";
import { colors, ThemeKey } from "@/theme";

export default function OrdersPage() {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";

  // Use colors.product for card backgrounds and text (theme-aware)
  const cardColors = colors.product[themeKey];
  // Use colors.header for page background & text
  const pageColors = colors.header[themeKey];

  const orders = useOrdersStore((state) => state.orders);
  const setOrders = useOrdersStore((state) => state.setOrders);

  // Hydrate store from localStorage on mount
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, [setOrders]);

  return (
    <ProtectedRoute>
      <main className={`max-w-4xl mx-auto p-6 ${pageColors.bg} ${pageColors.text} space-y-6 mt-6 mb-6`}>
        <h1 className="text-2xl font-semibold mb-4">My Orders</h1>

        {orders.length === 0 ? (
          <div className={`border rounded p-4 ${cardColors.bg} ${cardColors.text}`}>
            No orders yet.
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className={`border rounded p-4 flex flex-col space-y-2 ${cardColors.bg} ${cardColors.text}`}
            >
              <div className="flex justify-between font-medium">
                <span>Order ID: {order.id}</span>
                <span>Status: {order.status}</span>
              </div>
              <div>Total Amount: ${order.total_amount.toFixed(2)}</div>
              <div>
                Items:
                <ul className="ml-4 list-disc">
                  {order.items.map((item) => (
                    <li key={item.product_id}>
                      {item.name} × {item.quantity} (${item.price.toFixed(2)})
                    </li>
                  ))}
                </ul>
              </div>
              <div>Shipping: {order.shipping_address}</div>
              <div className="text-sm text-gray-400">
                Created at: {new Date(order.created_at).toLocaleString()}
              </div>
            </div>
          ))
        )}

        {orders.length > 0 && (
          <p className="mt-6 text-sm text-gray-500">
            Orders are currently stored in localStorage for frontend testing.
          </p>
        )}
      </main>
    </ProtectedRoute>
  );
}
