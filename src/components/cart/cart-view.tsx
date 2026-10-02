"use client";

import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CtaLink, ctaClass } from "@/components/site/cta-link";
import { Eyebrow, gutter } from "@/components/site/section";
import { useCart } from "@/lib/cart-store";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { QuantityStepper } from "./quantity-stepper";
import { useCartLines } from "./use-cart-lines";

export function CartStatusMessage({
  status,
  refetch,
}: {
  status: "loading" | "empty" | "error";
  refetch: () => void;
}) {
  if (status === "loading") {
    return <p className={`${gutter} py-16 text-ink-soft`}>Memuat pesanan...</p>;
  }
  if (status === "error") {
    return (
      <div className={`${gutter} flex flex-col items-start gap-4 py-16`}>
        <p className="text-ink-soft">Pesanan gagal dimuat.</p>
        <button
          type="button"
          className={ctaClass("outline")}
          onClick={() => refetch()}
        >
          Coba lagi
        </button>
      </div>
    );
  }
  return (
    <div className={`${gutter} flex flex-col items-start gap-4 py-16`}>
      <p className="text-ink-soft">Pesanan Anda masih kosong.</p>
      <CtaLink href="/menu" variant="primary">
        Lihat Menu
      </CtaLink>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <header
      className={`${gutter} flex flex-col gap-3 pt-7 pb-2 md:pt-14 md:pb-6`}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="font-heading text-3xl leading-[1.2] text-ink md:text-[56px] md:leading-normal">
        {title}
      </h1>
    </header>
  );
}

export function CartView() {
  const cart = useCartLines();
  const setQuantity = useCart((state) => state.setQuantity);
  const remove = useCart((state) => state.remove);

  const eyebrow =
    cart.lines.length > 0 ? `${cart.lines.length} item` : "Keranjang";

  return (
    <>
      <PageHeader eyebrow={eyebrow} title="Pesanan Anda" />
      {cart.status !== "ready" ? (
        <CartStatusMessage status={cart.status} refetch={cart.refetch} />
      ) : (
        <div className="md:flex md:items-start md:gap-14 md:px-12 md:pt-2 md:pb-22 lg:px-30">
          <ul className="flex flex-col px-5 py-2 md:flex-1 md:p-0">
            {cart.lines.map((line) => (
              <li
                key={line.id}
                className="grid grid-cols-[76px_1fr_auto] items-start gap-x-3.5 gap-y-1.5 border-b border-line py-4 last:border-b-0 md:grid-cols-[104px_1fr_auto_110px_auto] md:items-center md:gap-x-6 md:py-5 md:last:border-b"
              >
                <Link
                  href={`/menu/${line.slug}`}
                  aria-label={line.name}
                  className="relative col-start-1 row-[1/span_3] size-19 overflow-hidden bg-line md:row-[1/span_2] md:size-26"
                >
                  {line.image && (
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      sizes="104px"
                      className={cn(
                        "object-cover",
                        !line.isAvailable && "opacity-50 grayscale",
                      )}
                    />
                  )}
                </Link>
                <p className="col-start-2 row-start-1 self-start font-heading text-base leading-tight text-ink md:self-end md:text-[22px]">
                  {line.name}
                </p>
                <div className="col-[2/span_2] row-start-2 flex flex-col gap-1 md:col-[2/span_1] md:self-start">
                  <p className="text-xs text-ink-soft md:text-[13px]">
                    {formatRupiah(line.price)} / item
                  </p>
                  {!line.isAvailable && (
                    <p className="text-[13px] font-semibold text-ink">
                      Habis. Hapus untuk melanjutkan.
                    </p>
                  )}
                </div>
                <div className="col-start-2 row-start-3 md:col-start-3 md:row-[1/span_2]">
                  <QuantityStepper
                    compact
                    label={`Jumlah ${line.name}`}
                    value={line.quantity}
                    onChange={(next) => setQuantity(line.id, next)}
                  />
                </div>
                <p className="col-start-3 row-start-3 self-center text-sm font-semibold text-ink md:col-start-4 md:row-[1/span_2] md:text-base">
                  {line.isAvailable ? formatRupiah(line.subtotal) : "-"}
                </p>
                <button
                  type="button"
                  aria-label={`Hapus ${line.name}`}
                  className="col-start-3 row-start-1 flex size-6 items-center justify-center justify-self-end text-ink-soft transition-colors hover:text-ink md:col-start-5 md:row-[1/span_2] md:size-11"
                  onClick={() => remove([line.id])}
                >
                  <Trash2Icon className="size-4.5 md:size-5" />
                </button>
              </li>
            ))}
          </ul>
          <aside className="flex flex-col gap-3 bg-cream-dark px-5 py-6 md:w-95 md:gap-4 md:p-7">
            <p className="hidden text-xs font-semibold tracking-[0.21em] text-brand md:block">
              RINGKASAN
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-soft">
                Subtotal ({cart.itemCount} item)
              </span>
              <span className="font-medium text-ink">
                {formatRupiah(cart.total)}
              </span>
            </div>
            <hr className="hidden border-line md:block" />
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-ink">Total</span>
              <span className="font-heading text-2xl text-brand md:text-[32px]">
                {formatRupiah(cart.total)}
              </span>
            </div>
            {cart.hasUnavailable ? (
              <button type="button" disabled className={ctaClass("primary")}>
                Lanjut ke Checkout
              </button>
            ) : (
              <CtaLink href="/checkout" variant="primary">
                Lanjut ke Checkout
              </CtaLink>
            )}
            <CtaLink href="/menu" variant="outline">
              Tambah Menu Lagi
            </CtaLink>
          </aside>
        </div>
      )}
    </>
  );
}
