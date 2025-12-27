export interface Promo {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
}

export const promos: Promo[] = [
  {
    id: "1",
    title: "Top Phones Deals",
    subtitle: "Up to 50% off",
    image: "/assets/images/promo/promotion.jpeg",
    link: "/products?category=phone",
  },
  {
    id: "2",
    title: "Laptop Sale",
    subtitle: "High performance, low price",
    image: "/assets/images/promo/promotion2.jpeg",
    link: "/products?category=laptop",
  },
  {
    id: "3",
    title: "Power Banks",
    subtitle: "Never run out of battery",
    image: "/assets/images/promo/power-bank-promo.jpeg",
    link: "/products?category=power-bank",
  },
  {
    id: "4",
    title: "TV Specials",
    subtitle: "Best deals for your living room",
    image: "/assets/images/promo/promo-samsung-tv.webp",
    link: "/products?category=television",
  },
];
