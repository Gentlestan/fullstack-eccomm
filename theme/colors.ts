import { ThemedSection, HeaderTheme, FooterTheme, HeroTheme, ProductTheme } from "./types";

export const colors: {
  header: ThemedSection<HeaderTheme>;
  footer: ThemedSection<FooterTheme>;
  hero: ThemedSection<HeroTheme>;
  product: ThemedSection<ProductTheme>;
} = {
  header: {
    light: {
      bg: "bg-gray-900",
      text: "text-white",
      navLink: "text-gray-100 hover:underline",
      icon: "text-white hover:text-gray-700",
      shadow: "shadow-md",
    },
    dark: {
      bg: "bg-white",
      text: "text-gray-900",
      navLink: "text-gray-900 hover:underline",
      icon: "text-gray-900 hover:text-gray-300",
      shadow: "shadow-md",
    },
  },

  footer: {
    light: {
      bg: "bg-gray-900",
      text: "text-white",
      navLink: "text-white hover:underline",
      icon: "text-white hover:text-gray-300",
      shadow: "shadow-lg",
       link: "text-gray-100 hover:text-gray-500",
        buttonPrimary: "bg-blue-600 text-white hover:bg-blue-700",
        inputBg: "bg-white text-gray-900",
    },
    dark: {
      bg: "bg-white",
      text: "text-gray-900",
      navLink: "text-gray-900 hover:underline",
      icon: "text-gray-900 hover:text-gray-700",
      shadow: "shadow-lg",
      link: "text-gray-900 hover:text-gray-400",
      buttonPrimary: "bg-blue-500 text-white hover:bg-blue-600",
     inputBg: "bg-gray-800 text-white", 
    
    },
  },

  hero: {
    light: {
      bg: "bg-white",
      text: "text-gray-900",
      subText: "text-gray-600",
      subtitle: "text-gray-600",
      buttonPrimary: "bg-blue-600 text-white hover:bg-blue-700",
      buttonSecondary:"bg-gray-200 text-gray-900 hover:bg-gray-300 border border-gray-300",
    },
    dark: {
      bg: "bg-gray-900",
      text: "text-gray-100",
      subText: "text-gray-300",
      subtitle: "text-gray-300",
      buttonPrimary: "bg-blue-500 text-white hover:bg-blue-600",
      buttonSecondary:"bg-gray-800 text-gray-100 hover:bg-gray-700 border border-gray-700",
    },
  },

  product: {
    light: {
      bg: "bg-white",
      text: "text-gray-900",
      cardBg: "bg-gray-100",
      border: "border border-gray-300",
      price: "text-blue-600",
      addToCart: "bg-blue-600 text-white",
      wishlist: "bg-gray-800 text-white",
    },
    dark: {
      bg: "bg-gray-900",
      text: "text-gray-100",
      cardBg: "bg-gray-800",
      border: "border border-gray-700",
      price: "text-blue-300",
      addToCart: "bg-blue-400 text-gray-900",
      wishlist: "bg-white text-black",
    },
  },
};

