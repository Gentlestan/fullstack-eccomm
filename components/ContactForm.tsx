"use client";

import { useTheme } from "next-themes";
import { colors, ThemeKey, ProductTheme } from "@/theme";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

interface ContactFormProps {
  showWhatsApp?: boolean; // optional: show floating WhatsApp button
}

export default function ContactForm({ showWhatsApp = false }: ContactFormProps) {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors: ProductTheme = colors.product[themeKey];

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    // TODO: connect to backend or Supabase
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="relative">
      <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
        {submitted && (
          <p className="text-green-500 font-semibold text-center">
            Thank you! Your message has been sent.
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={`px-4 py-4 rounded-lg border ${themeColors.border} text-inherit w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={`px-4 py-4 rounded-lg border ${themeColors.border} text-inherit w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className={`px-4 py-4 rounded-lg border ${themeColors.border} text-inherit w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <button
            type="submit"
            className={`px-6 py-3 rounded-lg font-semibold ${themeColors.addToCart} hover:opacity-90 transition`}
          >
            Send Message
          </button>
        </form>
      </div>

      {/* WhatsApp Floating Button */}
      {showWhatsApp && (
        <a
          href="https://wa.me/2348062991395"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition"
        >
          <FaWhatsapp size={28} />
        </a>
      )}
    </div>
  );
}
