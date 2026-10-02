import { WheatIcon } from "lucide-react";
import { CtaLink } from "@/components/site/cta-link";

export function Cta() {
  return (
    <section className="flex flex-col items-center gap-4 bg-ink px-6 py-12 text-center md:gap-5 md:px-30 md:py-22">
      <WheatIcon className="size-7 text-gold md:size-9" />
      <h2 className="font-heading text-3xl text-cream md:text-5xl">
        Lapar? Pesan sekarang.
      </h2>
      <p className="text-sm text-sand md:text-base">
        Pilih menu favorit Anda dan kirim pesanan lewat WhatsApp.
      </p>
      <CtaLink href="/menu" variant="primary" className="w-full md:w-auto">
        Lihat Menu & Pesan
      </CtaLink>
    </section>
  );
}
