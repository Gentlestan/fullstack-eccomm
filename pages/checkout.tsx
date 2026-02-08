"use client";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import { useCartStore } from "@/components/store/CartStore";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {items.length === 0 ? (
        <p className="text-red-500">Your cart is empty.</p>
      ) : (
        <CheckoutForm items={items} />
      )}
    </div>
  );
}
