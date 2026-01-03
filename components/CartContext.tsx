"use client";

import { createContext, useContext, RefObject, useRef, ReactNode } from "react";

interface CartContextType {
  cartRef: RefObject<HTMLDivElement | null>;
}

export const CartContext = createContext<CartContextType | null>(null);

// ✅ Hook to consume cart context
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

// ✅ CartProvider component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const cartRef = useRef<HTMLDivElement>(null);

  return (
    <CartContext.Provider value={{ cartRef }}>
      {children}
    </CartContext.Provider>
  );
};
