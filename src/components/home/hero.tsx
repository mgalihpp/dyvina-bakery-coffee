import Image from "next/image";
import { CtaLink } from "@/components/site/cta-link";
import { gutter } from "@/components/site/section";
import { photos, site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative flex h-140 items-end overflow-hidden text-cream md:h-170">
      <Image
        src={photos.hero}
        alt="Roti dan kopi di Dyvina Bakery & Coffee"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-ink/20 to-ink/95" />
      <div
        className={`${gutter} relative flex w-full flex-col gap-3.5 pb-6 md:gap-5 md:pb-18`}
      >
        <p className="text-[11px] font-semibold tracking-[0.22em] text-gold md:text-xs md:tracking-[0.25em]">
          BAKERY & COFFEE
        </p>
        <h1 className="font-heading text-7xl font-light leading-none md:text-[150px]">
          Dyvina
        </h1>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
          <p className="max-w-130 font-heading text-xl leading-snug md:text-[28px] md:leading-[1.3]">
            {site.tagline}
          </p>
          <div className="flex gap-3 md:gap-4">
            <CtaLink
              href="/menu"
              variant="outlineLight"
              className="flex-1 md:flex-none"
            >
              Lihat Menu
            </CtaLink>
            <CtaLink
              href="/menu"
              variant="primary"
              className="flex-1 md:flex-none"
            >
              Pesan Sekarang
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LabelRow() {
  return (
    <div className="flex items-center justify-center gap-4 py-4 text-[11px] font-semibold tracking-[0.22em] text-ink-soft md:gap-8 md:py-5.5 md:text-xs md:tracking-[0.25em]">
      <span>ROTI</span>
      <span className="h-3 w-px bg-line md:h-3.5" />
      <span>KUE</span>
      <span className="h-3 w-px bg-line md:h-3.5" />
      <span>KOPI</span>
    </div>
  );
}
