// lib/types.ts

// --- Hero Section ---
export interface HeroData {
  title: string;
  subtitle: string;
  image: string;
  readMore: {
    label: string;
    href: string;
    slug: string;
  };
  addToCart: {
    label: string;
    slug: string;
    href?: string;
  };
}

// --- Shared Media Types ---
export interface Image {
  image: string;
  is_hero?: boolean;
  order?: number;
}

// --- Category ---
export interface Category {
  id: number;
  name: string;
  slug: string;
}

// --- Review ---
export interface Review {
  id: number;
  user_display_name: string;
  rating: number;
  comment: string;
  date: string;
  images: Image[];
  is_approved: boolean;
}

// --- Product ---
export interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  slug: string;
  category: Category;
  price: number;
  rating: number;
  staffRating: number;
  stock: number;
  images: Image[] | string[];
  reviews?: Review[];
}

// --- Orders ---
export interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CreateOrderPayload {
  items: OrderItem[];
  total_amount: number;
  payment_reference: string;
  shipping_address: string;
}

export interface Order {
  id: number;
  items: OrderItem[];
  total_amount: number;
  status: "pending" | "paid" | "failed";
  created_at: string;
  shipping_address?: string;

  // Optional timestamps for frontend tracking
  processing_at?: string | null;
  shipped_at?: string | null;
  delivered_at?: string | null;
  cancelled_at?: string | null;
}

// --- Auth ---
export type UserRole = "user" | "admin";

export interface AuthUser {
  id: number;
  email: string;
  displayName?: string;
  role?: UserRole;
}

export interface AuthUserAPI {
  id: number;
  email: string;
  display_name?: string | null;
  role?: UserRole;
}

export const mapAuthUser = (apiUser: AuthUserAPI): AuthUser => ({
  id: apiUser.id,
  email: apiUser.email,
  displayName: apiUser.display_name?.trim() || "",
  role: apiUser.role || "user",
});

export interface SignupResponse {
  message: string;
  email: string;
  verification_link?: string;
  access?: string;
  refresh?: string;
}

// --- Cart Item ---
export interface CartItem {
  product: Product;
  qty: number; // quantity of the product in the cart
}

// --- Auth State ---
export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  signup: (email: string, password: string, displayName?: string) => Promise<SignupResponse>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;

  fetchUser: () => Promise<void>;
  updateProfile: (displayName: string) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<any>;
  deleteAccount: () => Promise<void>;

  forgotPassword: (email: string) => Promise<string>;
  resetPassword: (uid: string, token: string, newPassword: string) => Promise<string>;
  authFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  refreshAccessToken: () => Promise<string | null>;

  // -------------------
  // Orders
  // -------------------
  orders: Order[];
  addOrder: (order: Order) => void;

  // -------------------
  // Cart
  // -------------------
  cart: CartItem[];                   // Current cart items
  setCart: (items: CartItem[]) => void; // Set/update cart
  clearCart: () => void;               // Empty cart
}

// --- Pagination ---
export interface PaginatedProducts {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}
