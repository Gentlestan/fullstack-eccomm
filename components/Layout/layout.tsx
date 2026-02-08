"use client";

import { ReactNode, useEffect, useRef } from "react";
import Header from "./Header/Header";
import Footer from "./Footer";
import { CartContext } from "../CartContext";
import { useCartStore } from "@/components/store/CartStore";
import { authstore } from "@/components/store/authstore";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const cartRef = useRef<HTMLDivElement | null>(null);

  const fetchCart = useCartStore((s) => s.fetchCart);
  const token = authstore((s) => s.accessToken);

  // 🔑 THIS is the backend cart sync
  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token, fetchCart]);

  return (
    <CartContext.Provider value={{ cartRef }}>
      <Header cartRef={cartRef} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </CartContext.Provider>
  );
};

export default Layout;
