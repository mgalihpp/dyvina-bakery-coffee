"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { CtaLink, ctaClass } from "@/components/site/cta-link";
import { gutter } from "@/components/site/section";
import { useCart } from "@/lib/cart-store";
import { formatRupiah } from "@/lib/format";
import { customerSchema } from "@/lib/order";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { CartStatusMessage, PageHeader } from "./cart-view";
import { useCartLines } from "./use-cart-lines";

type CustomerValues = z.infer<typeof customerSchema>;

const FORM_ID = "checkout-form";

const fieldClass =
  "w-full border border-line bg-[#FBF9F4] px-3.5 text-sm text-ink outline-none placeholder:text-[#8F897D] focus:border-brand aria-invalid:border-red-700";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: children is the wrapped input
    <label className="flex flex-col gap-2">
      <span className="text-[11px] font-semibold tracking-[1.5px] text-ink-soft uppercase">
        {label}
      </span>
      {children}
      {error && <span className="text-[13px] text-red-700">{error}</span>}
    </label>
  );
}

export function CheckoutForm() {
  const trpc = useTRPC();
  const cart = useCartLines();
  const clear = useCart((state) => state.clear);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerValues>({ resolver: zodResolver(customerSchema) });

  const create = useMutation(
    trpc.order.create.mutationOptions({
      onSuccess: (result) => {
        clear();
        window.location.assign(result.whatsappUrl);
      },
    }),
  );

  if (create.data) {
    return (
      <>
        <PageHeader eyebrow="Pesanan dicatat" title="Terima kasih" />
        <div className={`${gutter} flex flex-col items-start gap-4 py-8`}>
          <CheckIcon className="size-8 text-brand" />
          <p className="text-ink-soft">
            Nomor pesanan Anda {create.data.orderNumber}. Jika WhatsApp belum
            terbuka, tekan tombol di bawah untuk mengirim pesan ke Dyvina.
          </p>
          <a href={create.data.whatsappUrl} className={ctaClass("primary")}>
            Buka WhatsApp
          </a>
          <CtaLink href="/menu" variant="outline">
            Kembali ke Menu
          </CtaLink>
        </div>
      </>
    );
  }

  const header = <PageHeader eyebrow="Langkah terakhir" title="Checkout" />;

  if (cart.status !== "ready") {
    return (
      <>
        {header}
        <CartStatusMessage status={cart.status} refetch={cart.refetch} />
      </>
    );
  }

  const serverMessage =
    create.error?.data?.code === "CONFLICT"
      ? create.error.message
      : "Pesanan gagal dikirim. Periksa koneksi Anda lalu coba lagi.";

  return (
    <>
      {header}
      <div className="md:flex md:items-start md:gap-14 md:px-12 md:pt-2 md:pb-22 lg:px-30">
        <form
          id={FORM_ID}
          noValidate
          className="flex flex-col gap-4.5 px-5 py-4 md:flex-1 md:gap-5.5 md:p-0"
          onSubmit={handleSubmit((values) =>
            create.mutate({ ...values, items: cart.items }),
          )}
        >
          <Field label="Nama" error={errors.customerName?.message}>
            <input
              {...register("customerName")}
              autoComplete="name"
              placeholder="Nama lengkap"
              aria-invalid={!!errors.customerName}
              className={cn(fieldClass, "h-12")}
            />
          </Field>
          <Field label="Nomor WhatsApp" error={errors.phone?.message}>
            <input
              {...register("phone")}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="08xx-xxxx-xxxx"
              aria-invalid={!!errors.phone}
              className={cn(fieldClass, "h-12")}
            />
          </Field>
          <Field
            label="Catatan pesanan (opsional)"
            error={errors.note?.message}
          >
            <textarea
              {...register("note")}
              placeholder="Contoh: tanpa gula, diambil jam 4 sore"
              aria-invalid={!!errors.note}
              className={cn(fieldClass, "h-24 resize-none py-3.5 md:h-30")}
            />
          </Field>
        </form>

        <section className="md:flex md:w-105 md:flex-col md:gap-4 md:bg-cream-dark md:p-7">
          <div className="flex flex-col gap-3.5 bg-cream-dark px-5 py-6 md:gap-4 md:p-0">
            <p className="text-[11px] font-semibold tracking-[0.23em] text-brand md:text-xs md:tracking-[0.21em]">
              RINGKASAN PESANAN
            </p>
            <ul className="flex flex-col gap-3.5 md:gap-4">
              {cart.lines.map((line) => (
                <li key={line.id} className="flex justify-between gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-heading text-[15px] text-ink md:text-[17px]">
                      {line.name}
                    </span>
                    <span className="text-xs text-ink-soft">
                      {line.quantity} x {formatRupiah(line.price)}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-ink">
                    {line.isAvailable ? formatRupiah(line.subtotal) : "Habis"}
                  </span>
                </li>
              ))}
            </ul>
            <hr className="border-line" />
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-ink">Total</span>
              <span className="font-heading text-[26px] text-brand md:text-[32px]">
                {formatRupiah(cart.total)}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 px-5 pt-6 pb-10 md:gap-4 md:p-0">
            {cart.hasUnavailable && (
              <p className="text-[13px] text-red-700">
                Ada produk yang habis.{" "}
                <Link href="/cart" className="underline">
                  Hapus dari pesanan
                </Link>{" "}
                untuk melanjutkan.
              </p>
            )}
            {create.isError && (
              <p role="alert" className="text-[13px] text-red-700">
                {serverMessage}
              </p>
            )}
            <button
              type="submit"
              form={FORM_ID}
              disabled={cart.hasUnavailable || create.isPending}
              className={ctaClass("primary")}
            >
              {create.isPending ? "Mengirim..." : "Kirim Pesanan via WhatsApp"}
            </button>
            <p className="text-xs leading-[1.6] text-ink-soft md:leading-[1.65]">
              Pesanan dicatat, lalu WhatsApp terbuka dengan pesan siap kirim.
              Pembayaran dilakukan langsung dengan Dyvina.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
