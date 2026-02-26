"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { colors, ThemeKey } from "@/theme";
import { CartItem } from "@/components/store/CartStore";
import { authstore } from "@/components/store/authstore";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: any) => { openIframe: () => void };
    };
  }
}

interface CheckoutFormProps {
  items: CartItem[];
}

export default function CheckoutForm({ items }: CheckoutFormProps) {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.product[themeKey];

  const isProcessingRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "" | "success" | "error" | "closed" | "invalid_form" | "empty_cart" | "paystack_not_ready" | "out_of_stock"
  >("");
  const [paystackReady, setPaystackReady] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  // Load Paystack script
  useEffect(() => {
    if (window.PaystackPop) return setPaystackReady(true);

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setPaystackReady(true);
    script.onerror = () => setPaystackReady(false);
    document.body.appendChild(script);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid =
    !!form.name &&
    !!form.email &&
    !!form.phone &&
    !!form.address &&
    !!form.city &&
    !!form.country;

  const totalPrice = items.reduce(
    (sum, item) => sum + (item.product?.price ?? 0) * (item.qty ?? 0),
    0
  );

  // ------------------------
  // CREATE PENDING ORDER
  // ------------------------
  const createPendingOrder = async (): Promise<number> => {
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const authFetch = authstore.getState().authFetch;
    if (!API_URL || !authFetch) throw new Error("Auth not ready");

    const res = await authFetch(`${API_URL}/orders/create_pending/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "Failed to create pending order");
    }

    const data = await res.json();
    return data.pending_order_id;
  };

  // ------------------------
  // PAYSTACK PAYMENT HANDLER
  // ------------------------
  const handlePaystackPayment = async () => {
    if (loading) return;
    setLoading(true);
    setPaymentStatus("");

    try {
      if (!items.length) {
        setPaymentStatus("empty_cart");
        setLoading(false);
        return;
      }

      if (!isFormValid) {
        setPaymentStatus("invalid_form");
        setLoading(false);
        return;
      }

      if (!window.PaystackPop) {
        setPaymentStatus("paystack_not_ready");
        setLoading(false);
        return;
      }

      // 1️⃣ Create pending order
      const orderId = await createPendingOrder();

      // Freeze shipping data before opening Paystack
    const shippingData = {
      shipping_name: form.name,
      shipping_phone: form.phone,
      shipping_address: form.address,
      shipping_city: form.city,
      shipping_country: form.country,
    };


      // 2️⃣ Open Paystack popup
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_TEST_KEY || "",
        email: form.email,
        amount: totalPrice * 100, // in kobo
        currency: "NGN",

        callback(response: { reference: string }) {
          if (isProcessingRef.current) return;
          isProcessingRef.current = true;

          (async () => {
            try {
              const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
              const authFetch = authstore.getState().authFetch;

              // Send all shipping info
              const res = await authFetch(`${API_URL}/payments/paystack/verify/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                reference: response.reference,
                pending_order_id: orderId,
                ...shippingData,
              }),

              });

              const data = await res.json();
              console.log("Paystack verify response:", data);

              if (!res.ok) throw new Error(data.detail || "Payment verification failed");

              // Success → clear cart
              authstore.getState().clearCart();
              setPaymentStatus("success");
            } catch (err) {
              console.error("Payment verification error:", err);
              setPaymentStatus("error");
            } finally {
              isProcessingRef.current = false;
              setLoading(false);
            }
          })();
        },

        onClose() {
          setPaymentStatus("closed");
          setLoading(false);
        },
      });

      handler.openIframe();
    } catch (err) {
      console.error("Payment error:", err);
      setPaymentStatus("error");
      setLoading(false);
    }
  };

  // ------------------------
  // Check if checkout allowed
  // ------------------------
  const hasInvalidItems = items.some((item) => item.qty > item.product.stock);
  const canPay = isFormValid && items.length && paystackReady && !hasInvalidItems;

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
            value={form[field as keyof typeof form]}
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
              value={form[field as keyof typeof form]}
              onChange={handleChange}
              className={`border p-3 rounded-lg w-full focus:ring-2 ring-blue-400 ${themeColors.text} ${themeColors.bg}`}
            />
          ))}
        </div>

        <button
          onClick={handlePaystackPayment}
          disabled={!canPay || loading}
          className={`w-full ${themeColors.addToCart} py-3 rounded-lg hover:scale-105 transition disabled:opacity-50`}
        >
          {loading
            ? "Processing Payment..."
            : !paystackReady
            ? "Loading Payment..."
            : hasInvalidItems
            ? "Some items exceed stock"
            : "Pay Now"}
        </button>

        {/* Status messages */}
        {paymentStatus === "success" && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
            🎉 Payment successful! Your order has been placed.
          </div>
        )}
        {paymentStatus === "closed" && (
          <div className="mt-4 p-3 bg-yellow-100 text-yellow-700 rounded">
            Payment popup closed without completing.
          </div>
        )}
        {paymentStatus === "error" && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
            ❌ Payment verification failed. Check console for details.
          </div>
        )}
        {paymentStatus === "invalid_form" && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">❌ Please fill all required fields.</div>
        )}
        {paymentStatus === "empty_cart" && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">❌ Your cart is empty.</div>
        )}
        {paymentStatus === "paystack_not_ready" && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">❌ Payment system not ready. Try again.</div>
        )}
        {paymentStatus === "out_of_stock" && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">❌ Some items in your cart are out of stock.</div>
        )}
      </div>

      {/* RIGHT — Order Summary */}
      <div className={`md:col-span-4 p-4 border rounded-xl h-fit space-y-4 ${themeColors.cardBg || themeColors.bg}`}>
        <h2 className="text-lg font-semibold">Order Summary</h2>

        {items.map(({ product, qty }) => (
          <div key={product.id} className="flex justify-between text-sm">
            <span>
              {product.name} × {qty}
            </span>
            <span>₦{(product.price * qty).toFixed(2)}</span>
          </div>
        ))}

        <hr />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>₦{totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
