
import { Order, CreateOrderPayload } from "@/types/order";


export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  // MOCK BACKEND (for now)
  const newOrder: Order = {
    id: Date.now(),
    items: payload.items,
    total_amount: payload.total_amount,
    status: "paid",
    created_at: new Date().toISOString(),
  };

  const existing = JSON.parse(localStorage.getItem("orders") || "[]");
  localStorage.setItem("orders", JSON.stringify([...existing, newOrder]));

  return newOrder;
}
