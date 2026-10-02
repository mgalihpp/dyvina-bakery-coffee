"use client";

import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import { useHydrated } from "@/lib/use-hydrated";

export function CartLink() {
  const hydrated = useHydrated();
  const count = useCart((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const shown = hydrated ? count : 0;

  return (
    <Link
      href="/cart"
      aria-label={shown > 0 ? `Pesanan, ${shown} item` : "Pesanan"}
      className="flex items-center gap-2.5 text-sm font-semibold"
    >
      <span className="relative flex size-6.5 items-center justify-center md:size-auto">
        <ShoppingBagIcon className="size-6 md:size-[22px]" />
        {shown > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-ink text-[10px] leading-none font-bold text-cream md:hidden">
            {shown}
          </span>
        )}
      </span>
      <span className="hidden md:inline">
        Pesanan{shown > 0 && ` (${shown})`}
      </span>
    </Link>
  );
}
