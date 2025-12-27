"use client";

//import { useCartStore } from "../store/CartStore";
import { useCartStore } from "./store/CartStore";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, increaseQty, decreaseQty, removeFromCart } = useCartStore();

  const totalQty = items.reduce((acc, i) => acc + i.qty, 0);
  const totalPrice = items.reduce((acc, i) => acc + i.qty * i.product.price, 0);

  if (items.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <ShoppingCart className="w-16 h-16 mb-4 text-gray-400" />
        <p className="text-gray-600 mb-2 ">Please Add Item To Your Cart.</p>
        <Link href="/" className="text-blue-500 underline">
          Continue shopping
        </Link>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {/* Cart Items & Summary */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Items */}
        <div className="md:col-span-8 space-y-4">
          {items.map(({ product, qty }) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-4 border rounded-lg"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-gray-500">${product.price.toFixed(2)}</p>
              </div>
              <div className="flex flex-col items-center gap-2 ml-auto md:flex-row md:items-center">
              <div className="flex items-center gap-2">
                <button onClick={() => decreaseQty(product.id)} className="px-2 py-1 border rounded hover:bg-gray-100">-</button>
                <span className="px-2">{qty}</span>
                <button onClick={() => increaseQty(product.id)} className="px-2 py-1 border rounded hover:bg-gray-100">+</button>
              </div>

              <button
                onClick={() => removeFromCart(product.id)}
                className="p-2 hover:bg-red-100 rounded"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="md:col-span-4 p-4 border rounded-lg h-fit space-y-4">
          <h2 className="text-xl font-semibold">Summary</h2>
          <div className="flex justify-between">
            <span>Items:</span>
            <span>{totalQty}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <Link 
            href= "/checkout"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
