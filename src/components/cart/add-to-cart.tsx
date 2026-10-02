"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { ctaClass } from "@/components/site/cta-link";
import { ArrowLink } from "@/components/site/section";
import { useCart } from "@/lib/cart-store";
import { formatRupiah } from "@/lib/format";
import { QuantityStepper } from "./quantity-stepper";

export function AddToCart({
  product,
  children,
}: {
  product: { id: string; price: number; isAvailable: boolean };
  children?: React.ReactNode;
}) {
  const add = useCart((state) => state.add);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <>
      {product.isAvailable && (
        <div className="flex items-center justify-between md:justify-start md:gap-5">
          <span className="text-sm font-semibold text-ink">Jumlah</span>
          <QuantityStepper
            label="Jumlah produk"
            value={quantity}
            onChange={(next) => {
              setQuantity(next);
              setAdded(false);
            }}
          />
        </div>
      )}
      <div className="flex flex-col gap-3 md:flex-row">
        <button
          type="button"
          disabled={!product.isAvailable}
          className={ctaClass("primary", "w-full md:w-auto")}
          onClick={() => {
            add(product.id, quantity);
            setAdded(true);
          }}
        >
          {product.isAvailable
            ? `Tambah ke Pesanan - ${formatRupiah(product.price * quantity)}`
            : "Habis"}
        </button>
        {children}
      </div>
      {added && (
        <p
          role="status"
          className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-brand"
        >
          <span className="inline-flex items-center gap-1.5">
            <CheckIcon className="size-4" />
            Ditambahkan ke pesanan.
          </span>
          <ArrowLink href="/cart">Lihat pesanan</ArrowLink>
        </p>
      )}
    </>
  );
}
