import { ReactNode, useRef } from "react";
import Header from "./Header/Header";
import Footer from "./Footer";
import { CartContext } from "../CartContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const cartRef = useRef<HTMLDivElement | null>(null); // global flying cart ref

  return (
    <CartContext.Provider value={{ cartRef }}>
      <Header cartRef={cartRef} />

      <main className="min-h-screen">{children}</main>

      <Footer />
    </CartContext.Provider>
  );
};

export default Layout;
