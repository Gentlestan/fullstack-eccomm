"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { colors, ThemeKey } from "@/theme";

interface CheckoutFormProps {
  totalPrice: number;
  items: any[];
}

export default function CheckoutForm({ totalPrice, items }: CheckoutFormProps) {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = colors.product[themeKey]; // use product theme colors

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  // Load Paystack script
  useEffect(() => {
    if (!document.getElementById("paystack-script")) {
      const script = document.createElement("script");
      script.id = "paystack-script";
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid =
    form.name && form.email && form.phone && form.address && form.city && form.country;

  const handlePaystackPayment = () => {
    if (!isFormValid) return;

    setLoading(true);
    setPaymentStatus("");

    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_TEST_KEY,
      email: form.email,
      amount: totalPrice * 100, // convert to kobo
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
      callback: function () {
        setLoading(false);
        setPaymentStatus("success");
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

        {["name","email","phone","address"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "email" ? "email" : "text"}
            placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} *`}
            required
            value={(form as any)[field]}
            onChange={handleChange}
            className={`border p-3 rounded-lg w-full focus:ring-2 ring-blue-400 ${themeColors.text} ${themeColors.bg}`}
          />
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["city","country"].map((field) => (
            <input
              key={field}
              name={field}
              type="text"
              placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} *`}
              required
              value={(form as any)[field]}
              onChange={handleChange}
              className={`border p-3 rounded-lg w-full focus:ring-2 ring-blue-400 ${themeColors.text} ${themeColors.bg}`}
            />
          ))}
        </div>

        <button
          onClick={handlePaystackPayment}
          disabled={!isFormValid || loading}
          className={`w-full ${themeColors.addToCart} py-3 rounded-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? "Processing Payment..." : "Pay Now"}
        </button>

        {paymentStatus === "success" && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
            🎉 Payment Successful! Your order has been placed.
          </div>
        )}

        {paymentStatus === "closed" && (
          <div className="mt-4 p-3 bg-yellow-100 text-yellow-700 rounded">
            Payment popup closed without completing.
          </div>
        )}
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
