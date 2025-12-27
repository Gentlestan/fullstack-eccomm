import ContactForm from "@/components/ContactForm";
import { useTheme } from "next-themes";
import { colors, ThemeKey, ProductTheme } from "@/theme";


export default function ContactPage() {
  const { resolvedTheme } = useTheme();
  const themeKey: ThemeKey = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors: ProductTheme = colors.product[themeKey];

  return (
    <section className={`${themeColors.bg} ${themeColors.text} min-h-screen py-16 px-6 md:px-12`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-bold">We’re Here to Help You!</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl">
            Have questions about a product, your order, or anything else? Send us a message and
            we’ll get back to you promptly.
          </p>
        </div>

        <div className="flex-1">
          <ContactForm showWhatsApp={true} />
        </div>
      </div>
    </section>
  );
}
