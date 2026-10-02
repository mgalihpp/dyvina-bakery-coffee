"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addItem, type CartItem, removeItems, setItemQuantity } from "./cart";

type CartState = {
  items: CartItem[];
  add: (productId: string, quantity: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productIds: string[]) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (productId, quantity) =>
        set((state) => ({ items: addItem(state.items, productId, quantity) })),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          items: setItemQuantity(state.items, productId, quantity),
        })),
      remove: (productIds) =>
        set((state) => ({ items: removeItems(state.items, productIds) })),
      clear: () => set({ items: [] }),
    }),
    { name: "dyvina-cart", partialize: (state) => ({ items: state.items }) },
  ),
);
