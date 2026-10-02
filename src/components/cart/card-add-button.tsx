"use client";

import { CheckIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-store";

const FEEDBACK_MS = 1500;

export function CardAddButton({
  productId,
  name,
  disabled,
}: {
  productId: string;
  name: string;
  disabled: boolean;
}) {
  const add = useCart((state) => state.add);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), FEEDBACK_MS);
    return () => clearTimeout(timer);
  }, [added]);

  const Icon = added ? CheckIcon : PlusIcon;

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={added ? `${name} ditambahkan` : `Tambah ${name} ke pesanan`}
      className="flex size-9 shrink-0 items-center justify-center gap-1.5 rounded-sm bg-brand text-cream transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-40 md:size-auto md:px-4 md:py-2.5"
      onClick={() => {
        add(productId, 1);
        setAdded(true);
      }}
    >
      <Icon className="size-4.5 md:size-4" />
      <span className="hidden text-[13px] font-semibold md:inline">
        {added ? "Ditambah" : "Tambah"}
      </span>
    </button>
  );
}
