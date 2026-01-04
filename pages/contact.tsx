import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

import { colors } from "@/theme/colors";
import { useTheme } from "next-themes";




export default function ContactPage() {
  const { theme } = useTheme();
  const t = colors.contact[theme === "dark" ? "dark" : "light"];
  const hero = colors.hero[theme === "dark" ? "dark" : "light"];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className={`${t.bg} ${t.text}`}>
      {/* HERO */}
      <section className={`${hero.bg} py-16`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${hero.text}`}>
            Get In Touch
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${hero.subText}`}>
            Have questions? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <MapPin className="text-blue-500" />,
              title: "Visit Us",
              text: "123 Commerce Street, Victoria Island, Lagos, Nigeria",
            },
            {
              icon: <Phone className="text-green-500" />,
              title: "Call Us",
              text: "+234 800 123 4567\nMon–Fri: 9am–6pm",
            },
            {
              icon: <Mail className="text-purple-500" />,
              title: "Email Us",
              text: "support@gadgetxpress.com\nReplies within 24hrs",
            },
            {
              icon: <Clock className="text-orange-500" />,
              title: "Working Hours",
              text: "Mon–Fri: 9am–6pm\nSat: 10am–4pm",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`${t.cardBg} ${t.border} rounded-lg shadow-lg p-6`}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className={`text-sm whitespace-pre-line ${t.muted}`}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* FORM */}
        <div className={`${t.cardBg} ${t.border} rounded-lg shadow-lg p-8`}>
          <h2 className="text-3xl font-bold text-blue-900 mb-2 dark:text-blue-400">
            Send Us A Message
          </h2>
          <p className={`${t.subText} mb-8`}>
            Fill out the form and we’ll respond within 24 hours.
          </p>

          {submitted && (
            <div className="mb-6 flex gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <CheckCircle className="text-green-500" />
              <div>
                <p className="font-semibold">Message Sent</p>
                <p className="text-sm">We’ll be in touch shortly.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg ${t.inputBg} ${t.inputText} border ${t.inputBorder}`}
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg ${t.inputBg} ${t.inputText} border ${t.inputBorder}`}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg ${t.inputBg} ${t.inputText} border ${t.inputBorder}`}
              />

              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg ${t.inputBg} ${t.inputText} border ${t.inputBorder}`}
              >
                <option value="">Select Subject</option>
                <option>General Inquiry</option>
                <option>Order Support</option>
                <option>Returns</option>
                <option>Partnership</option>
              </select>
            </div>

            <textarea
              name="message"
              rows={6}
              placeholder="How can we help you?"
              value={formData.message}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-lg resize-none ${t.inputBg} ${t.inputText} border ${t.inputBorder}`}
            />

            <button
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 ${t.buttonPrimary}`}
            >
              {isSubmitting ? "Sending..." : <><Send size={18} /> Send Message</>}
            </button>
          </form>
        </div>

        {/* FAQ + SOCIAL */}
        <div className="space-y-8">
          <div className={`${t.cardBg} ${t.border} rounded-lg shadow-lg p-8`}>
            <h3 className="text-2xl font-bold text-blue-900 mb-6 dark:text-blue-400">
              Frequently Asked Questions
            </h3>

            {[
              "What are your delivery times?",
              "What is your return policy?",
              "Do you offer bulk discounts?",
            ].map((q, i) => (
              <div key={i} className="mb-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <MessageCircle className="text-blue-500" size={18} />
                  {q}
                </h4>
                <p className={`text-sm ml-6 ${t.subText}`}>
                  Please contact support for detailed information.
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-500/10 hover:bg-blue-500/20"
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
