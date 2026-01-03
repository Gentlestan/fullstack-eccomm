import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Layout from "@/components/Layout/layout";
import { Roboto } from "next/font/google";
import { CartProvider } from "@/components/CartContext"; // ✅ import provider

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
        {/* ✅ Wrap with CartProvider so cartRef is available */}
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </ThemeProvider>
    </main>
  );
}
