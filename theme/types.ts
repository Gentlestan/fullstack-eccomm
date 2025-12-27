export type ThemeKey = "light" | "dark";

export interface ThemedSection<T> {
  light: T;
  dark: T;
}



export interface HeaderTheme {
  bg: string;
  text: string;
  navLink: string;
  icon: string;
  shadow: string;
}

export interface FooterTheme {
  bg: string;
  text: string;
  navLink: string;
  icon: string;
  shadow: string;
  link: string;
  inputBg?: string;
  buttonPrimary: string;
}

export interface HeroTheme {
  bg: string;
  text: string;
  subText: string;
  subtitle: string;
  buttonPrimary: string;
  buttonSecondary: string;
}

export interface ProductTheme {
  bg: string;
  text: string;
  cardBg: string;
  border: string;
  price: string;
  addToCart: string;
  wishlist: string;
}
