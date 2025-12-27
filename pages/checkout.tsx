"use client";

import { useCartStore } from "@/components/store/CartStore";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
     console.log("PAYSTACK KEY:", process.env.NEXT_PUBLIC_PAYSTACK_TEST_KEY);
  const { items } = useCartStore();
  const totalPrice = items.reduce((acc, i) => acc + i.qty * i.product.price, 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <p className="text-gray-600 mb-3">Your cart is empty.</p>
        <a href="/cart" className="text-blue-500 underline">Go back to cart</a>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <CheckoutForm items={items} totalPrice={totalPrice} />
    </div>
  );
}
