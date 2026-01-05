"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { colors, ThemeKey } from "@/theme";
import { createOrder } from "@/services/order.service";
import { useOrdersStore } from "../store/orderStore";
import { CartItem } from "../store/CartStore"; // ✅ use CartItem type from store

interface CheckoutFormProps {
  totalPrice: number;
  items: CartItem[];
}

export default function CheckoutForm({ totalPrice, items }: CheckoutFormProps) {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.product[themeKey];

  const ordersStore = useOrdersStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "" | "success" | "closed" | "error" | "invalid_form" | "empty_cart" | "paystack_not_ready"
  >("");
  const [paystackReady, setPaystackReady] = useState(false);

  // Load Paystack script once
  useEffect(() => {
    if ((window as any).PaystackPop) {
      setPaystackReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setPaystackReady(true);
    document.body.appendChild(script);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid =
    form.name && form.email && form.phone && form.address && form.city && form.country;

  const handlePaystackPayment = () => {
    if (!paystackReady) return setPaymentStatus("paystack_not_ready");
    if (!items.length) return setPaymentStatus("empty_cart");
    if (!isFormValid) return setPaymentStatus("invalid_form");

    setLoading(true);
    setPaymentStatus("");

    const PaystackPop = (window as any).PaystackPop;
    if (!PaystackPop) {
      console.error("PaystackPop not available");
      setPaymentStatus("paystack_not_ready");
      setLoading(false);
      return;
    }

    const handler = PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_TEST_KEY,
      email: form.email,
      amount: totalPrice * 100,
      currency: "NGN",
      metadata: {
        custom_fields: [
          {
            display_name: form.name,
            variable_name: "mobile_number",
            value: form.phone,
          },
        ],
      },

      callback: function (response: any) {
        createOrder({
          items: items.map(({ product, qty }) => ({
            product_id: product.id,
            name: product.name,
            price: product.price,
            quantity: qty,
          })),
          total_amount: totalPrice,
          payment_reference: response.reference,
          shipping_address: `${form.address}, ${form.city}, ${form.country}`,
        })
          .then((newOrder) => {
            ordersStore.addOrder(newOrder);
            setPaymentStatus("success");
          })
          .catch((err) => {
            console.error("Order creation failed:", err);
            setPaymentStatus("error");
          })
          .finally(() => setLoading(false));
      },

      onClose: function () {
        setLoading(false);
        setPaymentStatus("closed");
      },
    });

    handler.openIframe();
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-6 ${themeColors.bg} ${themeColors.text}`}>
      {/* LEFT — Billing Form */}
      <div className={`md:col-span-8 space-y-5 border rounded-xl p-6 ${themeColors.cardBg || themeColors.bg}`}>
        <h2 className="text-lg font-semibold mb-4">Billing Information</h2>

        {["name", "email", "phone", "address"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "email" ? "email" : "text"}
            placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} *`}
            value={(form as any)[field]}
            onChange={handleChange}
            className={`border p-3 rounded-lg w-full focus:ring-2 ring-blue-400 ${themeColors.text} ${themeColors.bg}`}
          />
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["city", "country"].map((field) => (
            <input
              key={field}
              name={field}
              type="text"
              placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} *`}
              value={(form as any)[field]}
              onChange={handleChange}
              className={`border p-3 rounded-lg w-full focus:ring-2 ring-blue-400 ${themeColors.text} ${themeColors.bg}`}
            />
          ))}
        </div>

        <button
          onClick={handlePaystackPayment}
          disabled={!paystackReady || loading}
          className={`w-full ${themeColors.addToCart} py-3 rounded-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? "Processing Payment..." : !paystackReady ? "Loading Payment..." : "Pay Now"}
        </button>

        {/* Feedback messages */}
        {paymentStatus === "success" && <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">🎉 Payment successful! Your order has been placed.</div>}
        {paymentStatus === "closed" && <div className="mt-4 p-3 bg-yellow-100 text-yellow-700 rounded">Payment popup closed without completing.</div>}
        {paymentStatus === "error" && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">❌ Payment succeeded, but order creation failed.</div>}
        {paymentStatus === "invalid_form" && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">⚠️ Please fill in all required fields before checkout.</div>}
        {paymentStatus === "empty_cart" && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">⚠️ Your cart is empty.</div>}
        {paymentStatus === "paystack_not_ready" && <div className="mt-4 p-3 bg-yellow-100 text-yellow-700 rounded">⚠️ Payment system is still loading. Please try again in a moment.</div>}
      </div>

      {/* RIGHT — Order Summary */}
      <div className={`md:col-span-4 p-4 border rounded-xl h-fit space-y-4 ${themeColors.cardBg || themeColors.bg}`}>
        <h2 className="text-lg font-semibold">Order Summary</h2>

        {items.map(({ product, qty }) => (
          <div key={product.id} className="flex justify-between text-sm">
            <span>{product.name} × {qty}</span>
            <span>${(product.price * qty).toFixed(2)}</span>
          </div>
        ))}

        <hr />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
