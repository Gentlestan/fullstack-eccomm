// lib/mock/products.ts
import { Product } from "../types";

export const products: Product[] = [
  {
    id: "p1",
    name: "Samsung Galaxy S23 Ultra",
    description: "6.8-inch AMOLED, Snapdragon 8 Gen 2, 5000mAh battery.",
    brand: "Samsung",
    slug: "samsung-galaxy-s23-ultra",
    category: "phone",
    price: 999,
    rating: 4.8,
    staffRating: 4.9,
    stock: 35,
    images: [
      "/assets/images/products/phone-s23ultra-1.jpg",
      "/assets/images/products/phone-s23ultra-2.jpg",
      "/assets/images/products/phone-s23ultra-3.jpg"
    ],
    reviews: [
      { id: "r1", username: "Daniel", rating: 5, comment: "Fantastic phone. Camera is sharp and battery lasts all day.", date: "2024-11-12", images: [] },
      { id: "r2", username: "Blessing", rating: 4, comment: "Performance is smooth but it gets warm sometimes.", date: "2024-12-02", images: [] }
    ],
  },

  {
    id: "p2",
    name: "Apple iPhone 15 Pro Max",
    description: "A17 Pro chip, 48MP camera, titanium body.",
    brand: "Apple",
    slug: "apple-iphone-15-pro-max",
    category: "phone",
    price: 1199,
    rating: 4.9,
    staffRating: 4.95,
    stock: 22,
    images: [
      "/assets/images/products/iphone15-promax-1.jpg",
      "/assets/images/products/iphone15-promax-2.jpg",
      "/assets/images/products/iphone15-promax-3.jpg",
      "/assets/images/products/iphone15-promax-4.jpg"
    ],
    reviews: [
      { id: "r3", username: "Rosemary", rating: 5, comment: "Best iPhone upgrade so far. The camera is insane!", date: "2024-11-28", images: [] },
      { id: "r4", username: "Tunde", rating: 4, comment: "Very fast but battery life could be better.", date: "2024-12-10", images: [] }
    ],
  },

  {
    id: "p3",
    name: "Xiaomi Redmi Note 14 Pro",
    description: "108MP camera, 5000mAh battery, OLED display.",
    brand: "Xiaomi",
    slug: "xiaomi-redmi-note-14-pro",
    category: "phone",
    price: 349,
    rating: 4.4,
    staffRating: 4.2,
    stock: 50,
    images: [
      "/assets/images/products/redmi-note14pro-1.jpg",
      "/assets/images/products/redmi-note14pro-2.jpg",
      "/assets/images/products/redmi-note14pro-3.jpg",
      "/assets/images/products/redmi-note14pro-4.jpg"
    ],
    reviews: [
      { id: "r5", username: "Aisha", rating: 4, comment: "Affordable and powerful. Camera quality is impressive.", date: "2024-11-05", images: [] },
      { id: "r6", username: "Kelvin", rating: 5, comment: "Great battery and fast charging. Worth the price.", date: "2024-12-01", images: [] }
    ],
  },

  {
    id: "p4",
    name: "MacBook Air M2",
    description: "13-inch Liquid Retina display, 8-core M2 chip.",
    brand: "Apple",
    slug: "macbook-air-m2",
    category: "laptop",
    price: 1099,
    rating: 4.9,
    staffRating: 4.95,
    stock: 18,
    images: [
      "/assets/images/products/macbook-air-m2-1.jpg",
      "/assets/images/products/macbook-air-m2-2.jpg",
      "/assets/images/products/macbook-air-m2-3.jpg",
      "/assets/images/products/macbook-air-m2-4.jpg"
    ],
    reviews: [
      { id: "r7", username: "Samuel", rating: 5, comment: "Super silent, fast and battery lasts incredibly long.", date: "2024-10-20", images: [] },
      { id: "r8", username: "Mariam", rating: 5, comment: "Perfect for work and school. Lightweight and beautiful.", date: "2024-12-12", images: [] }
    ],
  },

  {
    id: "p5",
    name: "Dell XPS 15",
    description: "The Dell XPS 15 is a powerful 15-inch laptop balancing premium craftsmanship and performance.",
    brand: "Dell",
    slug: "dell-xps-15",
    category: "laptop",
    price: 1499,
    rating: 4.7,
    staffRating: 4.8,
    stock: 12,
    images: [
      "/assets/images/products/dell-xps15-1.jpg",
      "/assets/images/products/dell-xps15-2.jpg",
      "/assets/images/products/dell-xps15-3.jpg",
      "/assets/images/products/dell-xps15-4.jpg"
    ],
    reviews: [
      { id: "r9", username: "Chioma", rating: 5, comment: "One of the best Windows laptops. Build quality is premium.", date: "2024-11-01", images: [] },
      { id: "r10", username: "Emmanuel", rating: 4, comment: "Beautiful screen but fans get loud under heavy load.", date: "2024-11-25", images: [] }
    ],
  },

  {
    id: "p6",
    name: "HP Spectre x360",
    description: "2-in-1 convertible laptop with 16GB RAM and Intel Evo certification.",
    brand: "HP",
    slug: "hp-spectre-x360",
    category: "laptop",
    price: 1399,
    rating: 4.6,
    staffRating: 4.7,
    stock: 14,
    images: [
      "/assets/images/products/hp-spectra-x360-1.jpg",
      "/assets/images/products/hp-spectra-x360-2.jpg",
      "/assets/images/products/hp-spectra-x360-3.jpg",
      "/assets/images/products/hp-spectra-x360-4.jpg"
    ],
    reviews: [
      { id: "r11", username: "Oluwaseun", rating: 5, comment: "Excellent build quality and very responsive touchscreen.", date: "2024-11-15", images: [] },
      { id: "r12", username: "Fatima", rating: 4, comment: "Battery lasts a long time.", date: "2024-11-16", images: [] }
    ],
  },

  {
    id: "p7",
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise-cancelling wireless headphones.",
    brand: "Sony",
    slug: "sony-wh-1000xm5",
    category: "earphone",
    price: 399,
    rating: 4.7,
    staffRating: 4.85,
    stock: 25,
    images: [
      "/assets/images/products/sony-earpiece.jpg",
      "/assets/images/products/sony-earpiece-1.jpg",
      "/assets/images/products/sony-earpiece-2.jpg"
    ],
    reviews: [
      { id: "r13", username: "Uche", rating: 5, comment: "Noise cancellation is amazing!", date: "2024-11-17", images: [] },
      { id: "r14", username: "Chinwe", rating: 4, comment: "Comfortable to wear for long sessions.", date: "2024-11-18", images: [] }
    ],
  },

  {
    id: "p8",
    name: "Apple AirPods Pro 2",
    description: "Active noise cancellation, immersive sound, and spatial audio.",
    brand: "Apple",
    slug: "apple-airpods-pro-2",
    category: "earphone",
    price: 249,
    rating: 4.7,
    staffRating: 4.8,
    stock: 30,
    images: [
      "/assets/images/products/air-pod.jpg",
      "/assets/images/products/air-pod-1.jpg",
      "/assets/images/products/air-pod-2.jpg"
    ],
    reviews: [
      { id: "r15", username: "John", rating: 5, comment: "Sound quality is crystal clear.", date: "2024-11-19", images: [] },
      { id: "r16", username: "Mary", rating: 4, comment: "Battery could last longer.", date: "2024-11-20", images: [] }
    ],
  },

  {
    id: "p9",
    name: "Samsung Galaxy Buds 2 Pro",
    description: "High-quality wireless earbuds with excellent sound and ANC.",
    brand: "Samsung",
    slug: "samsung-galaxy-buds-2-pro",
    category: "earphone",
    price: 219,
    rating: 4.3,
    staffRating: 4.6,
    stock: 27,
    images: [
      "/assets/images/products/samsung-earbuds.jpg",
      "/assets/images/products/samsung-earbuds-1.jpg",
      "/assets/images/products/samsung-earbuds-2.jpg",
      "/assets/images/products/samsung-earbuds-3.jpg"
    ],
    reviews: [
      { id: "r17", username: "Emeka", rating: 4, comment: "Very comfortable and portable.", date: "2024-11-21", images: [] },
      { id: "r18", username: "Ngozi", rating: 5, comment: "Excellent connectivity and sound.", date: "2024-11-22", images: [] }
    ],
  },

  {
    id: "p10",
    name: "27,000mAh Power Bank",
    description: "High-capacity portable power bank with fast charging support.",
    brand: "Oraimo",
    slug: "27000mah-power-bank",
    category: "power-bank",
    price: 35,
    rating: 4.3,
    staffRating: 4.3,
    stock: 26,
    images: [
      "/assets/images/products/power-bank.jpg",
      "/assets/images/products/power-bank-1.jpg",
      "/assets/images/products/power-bank-2.jpg",
      "/assets/images/products/power-bank-3.jpg"
    ],
    reviews: [
      { id: "r19", username: "Tayo", rating: 4, comment: "Charges devices fast.", date: "2024-11-23", images: [] },
      { id: "r20", username: "Bola", rating: 5, comment: "Compact and reliable.", date: "2024-11-24", images: [] }
    ],
  },
  {
    id: "p11",
    name: "Anker PowerCore 20,000mAh",
    description: "High-capacity portable power bank with fast charging support.",
    brand: "Anker",
    slug: "anker-powercore-20000mah",
    category: "power-bank",
    price: 45,
    rating: 4.7,
    staffRating: 4.7,
    stock: 27,
    images: [
      "/assets/images/products/anker-power-bank1.jpg",
      "/assets/images/products/anker-power-bank2.jpg",
      "/assets/images/products/anker-power-bank3.jpg"
    ],
    reviews: [
      { id: "r61", username: "Ada", rating: 5, comment: "Powerful and reliable. Charges fast.", date: "2024-12-02", images: [] },
      { id: "r62", username: "Chike", rating: 4, comment: "Great capacity, a bit heavy to carry.", date: "2024-12-03", images: [] }
    ],
  },

  {
    id: "p12",
    name: "Samsung Galaxy S10 Ultra",
    description: "High-capacity power bank with multiple device charging support.",
    brand: "Samsung",
    slug: "samsung-galaxy-s10-ultra",
    category: "phone",
    price: 50,
    rating: 4.3,
    staffRating: 4.4,
    stock: 27,
    images: [
      "/assets/images/products/Samsung_Galaxy_S10_Plus1.jpg",
      "/assets/images/products/Samsung_Galaxy_S10_Plus2.jpg",
      "/assets/images/products/Samsung_Galaxy_S10_Plus3.jpg"
    ],
    reviews: [
      { id: "r63", username: "Kemi", rating: 5, comment: "High capacity and good build quality.", date: "2024-12-04", images: [] },
      { id: "r64", username: "Emmanuel", rating: 4, comment: "Works well but a bit bulky.", date: "2024-12-05", images: [] }
    ],
  },

  {
    id: "p13",
    name: "LG 55-inch 4K Smart TV",
    description: "55-inch 4K UHD Smart TV with HDR and webOS platform.",
    brand: "LG",
    slug: "lg-55-inch-4k-smart-tv",
    category: "television",
    price: 699,
    rating: 4.7,
    staffRating: 4.75,
    stock: 25,
    images: [
      "/assets/images/products/lg55-1.jpg",
      "/assets/images/products/lg55-2.jpg"
    ],
    reviews: [
      { id: "r65", username: "Tola", rating: 5, comment: "Amazing picture quality for the price.", date: "2024-12-06", images: [] },
      { id: "r66", username: "Funke", rating: 4, comment: "Sound could be better, but visuals are stunning.", date: "2024-12-07", images: [] }
    ],
  },

  {
    id: "p14",
    name: "Xiaomi Redmi Note 14 Pro",
    description: "108MP camera, 5000mAh battery, OLED display.",
    brand: "Xiaomi",
    slug: "xiaomi-redmi-note-14-pro",
    category: "phone",
    price: 349,
    rating: 4.4,
    staffRating: 4.2,
    stock: 50,
    images: [
      "/assets/images/products/redmi-note14pro-1.jpg",
      "/assets/images/products/redmi-note14pro-2.jpg",
      "/assets/images/products/redmi-note14pro-3.jpg",
      "/assets/images/products/redmi-note14pro-4.jpg"
    ],
    reviews: [
      { id: "r67", username: "Bayo", rating: 5, comment: "Excellent QLED display and smart features.", date: "2024-12-08", images: [] },
      { id: "r68", username: "Nneka", rating: 4, comment: "Heavy, but the screen is gorgeous.", date: "2024-12-09", images: [] }
    ],
  },

  {
    id: "p15",
    name: "LG 55-inch 4K Smart TV",
    description: "55-inch 4K UHD Smart TV with HDR and webOS platform.",
    brand: "LG",
    slug: "lg-55-inch-4k-smart-tv-2",
    category: "television",
    price: 699,
    rating: 4.7,
    staffRating: 4.75,
    stock: 25,
    images: [
      "/assets/images/products/lg55-1.jpg",
      "/assets/images/products/lg55-2.jpg"
    ],
    reviews: [
      { id: "r69", username: "Ifeanyi", rating: 5, comment: "Great TV for movies and gaming.", date: "2024-12-10", images: [] },
      { id: "r70", username: "Ngozi", rating: 4, comment: "Good value, sound is okay.", date: "2024-12-11", images: [] }
    ],
  },

  {
    id: "p16",
    name: "Apple AirPods Pro 2",
    description: "Active noise cancellation, immersive sound, and spatial audio.",
    brand: "Apple",
    slug: "apple-airpods-pro-2-2",
    category: "earphone",
    price: 249,
    rating: 4.7,
    staffRating: 4.8,
    stock: 30,
    images: [
      "/assets/images/products/air-pod.jpg",
      "/assets/images/products/air-pod-1.jpg",
      "/assets/images/products/air-pod-2.jpg"
    ],
    reviews: [
      { id: "r71", username: "Olu", rating: 5, comment: "Fast and smooth, gaming performance is excellent.", date: "2024-12-12", images: [] },
      { id: "r72", username: "Chika", rating: 4, comment: "Battery life could be better, otherwise great laptop.", date: "2024-12-13", images: [] }
    ],
  },

  {
    id: "p17",
    name: "Xiaomi Redmi Note 14 Pro",
    description: "108MP camera, 5000mAh battery, OLED display.",
    brand: "Xiaomi",
    slug: "xiaomi-redmi-note-14-pro-2",
    category: "phone",
    price: 349,
    rating: 4.4,
    staffRating: 4.2,
    stock: 50,
    images: [
      "/assets/images/products/redmi-note14pro-1.jpg",
      "/assets/images/products/redmi-note14pro-2.jpg",
      "/assets/images/products/redmi-note14pro-3.jpg",
      "/assets/images/products/redmi-note14pro-4.jpg"
    ],
    reviews: [
      { id: "r73", username: "Tunde", rating: 4, comment: "Affordable and decent performance.", date: "2024-12-14", images: [] },
      { id: "r74", username: "Blessing", rating: 5, comment: "Very good value for the price.", date: "2024-12-15", images: [] }
    ],
  },

  {
    id: "p18",
    name: "LG 55-inch 4K Smart TV",
    description: "55-inch 4K UHD Smart TV with HDR and webOS platform.",
    brand: "LG",
    slug: "lg-55-inch-4k-smart-tv-3",
    category: "television",
    price: 699,
    rating: 4.7,
    staffRating: 4.75,
    stock: 25,
    images: [
      "/assets/images/products/lg55-1.jpg",
      "/assets/images/products/lg55-2.jpg"
    ],
    reviews: [
      { id: "r75", username: "Aisha", rating: 4, comment: "Basic phone, works fine for calls and apps.", date: "2024-12-16", images: [] },
      { id: "r76", username: "Samuel", rating: 4, comment: "Good for casual use, battery is okay.", date: "2024-12-17", images: [] }
    ],
  },

  {
    id: "p19",
    name: "Apple AirPods Pro 2",
    description: "Active noise cancellation, immersive sound, and spatial audio.",
    brand: "Apple",
    slug: "apple-airpods-pro-2-3",
    category: "earphone",
    price: 249,
    rating: 4.7,
    staffRating: 4.8,
    stock: 30,
    images: [
      "/assets/images/products/air-pod.jpg",
      "/assets/images/products/air-pod-1.jpg",
      "/assets/images/products/air-pod-2.jpg"
    ],
    reviews: [
      { id: "r77", username: "Mary", rating: 4, comment: "Affordable and functional earbuds.", date: "2024-12-18", images: [] },
      { id: "r78", username: "Emeka", rating: 4, comment: "Decent sound, battery could last longer.", date: "2024-12-19", images: [] }
    ],
  },

  {
    id: "p20",
    name: "HP Spectre x360",
    description: "2-in-1 convertible laptop with 16GB RAM and Intel Evo certification.",
    brand: "HP",
    slug: "hp-spectre-x360-2",
    category: "laptop",
    price: 1399,
    rating: 4.6,
    staffRating: 4.7,
    stock: 14,
    images: [
      "/assets/images/products/hp-spectra-x360-1.jpg",
      "/assets/images/products/hp-spectra-x360-2.jpg",
      "/assets/images/products/hp-spectra-x360-3.jpg",
      "/assets/images/products/hp-spectra-x360-4.jpg"
    ],
    reviews: [
      { id: "r79", username: "Chinonso", rating: 5, comment: "Charges multiple devices quickly.", date: "2024-12-20", images: [] },
      { id: "r80", username: "Bola", rating: 4, comment: "Good capacity, feels solid.", date: "2024-12-21", images: [] }
    ],
  },

];
