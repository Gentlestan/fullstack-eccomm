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
}
