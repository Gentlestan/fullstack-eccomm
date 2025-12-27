
export interface HeroData {
  title: string;
  subtitle: string;
  readMore: {
    label: string;
    href: string;
    slug: string;
   
  };
  addToCart: {
    label: string;
    slug: string; // for future backend integration
  };
  image: string;
}
// Categories
// Review type
export interface Review {
  id: string;
  username: string;
  rating: number; // 1-5
  comment: string;
  date: string; // YYYY-MM-DD
  images: string[]; // array of image URLs

}

// Categories
export type Category = "laptop" | "phone" | "earphone" | "power-bank" | "television";

// Product type
export interface Product {
  id: string;
  name: string;
  description: string;
  brand: string;
  category: Category;
  price: number;
  rating: number;      // average of user reviews (1 decimal)
  staffRating: number; // expert rating (1-5)
  stock: number;
  slug: string;
  images: string[];    // multiple images for product gallery
  reviews: Review[];   // 3 reviews per product
}
