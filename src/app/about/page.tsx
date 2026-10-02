import { FlameIcon, HeartHandshakeIcon, WheatIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { CtaLink } from "@/components/site/cta-link";
import { PageShell } from "@/components/site/page-shell";
import { Eyebrow, gutter, SectionHeading } from "@/components/site/section";
import { aboutPhotos, site } from "@/lib/site";

const description =
  "Kenali Dyvina Bakery & Coffee: cerita, nilai, dan roti serta kopi yang kami buat segar setiap hari.";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `Tentang Kami | ${site.name}`,
    description,
    url: "/about",
    images: [{ url: aboutPhotos.outlet, alt: site.name }],
  },
};

const values = [
  {
    icon: WheatIcon,
    title: "Bahan pilihan",
    text: "Bahan segar dipilih dengan teliti.",
  },
  {
    icon: FlameIcon,
    title: "Dibuat setiap hari",
    text: "Dipanggang segar sebelum toko buka.",
  },
  {
    icon: HeartHandshakeIcon,
    title: "Layanan hangat",
    text: "Pelanggan disambut seperti keluarga.",
  },
] as const;

export default function AboutPage() {
  return (
    <PageShell>
      <section
        className={`${gutter} flex flex-col gap-3 pt-7 pb-5 md:flex-row md:items-end md:gap-18 md:pt-18 md:pb-14`}
      >
        <div className="flex flex-col gap-3 md:flex-1 md:gap-5">
          <Eyebrow>Tentang Kami</Eyebrow>
          <h1 className="font-heading text-[34px] leading-[1.2] text-ink md:text-[64px] md:leading-[1.15]">
            Cerita di balik setiap roti.
          </h1>
        </div>
        <p className="hidden text-lg leading-[1.65] text-ink-soft md:block md:flex-1">
          Dyvina berawal dari dapur kecil dengan satu tujuan: menyajikan roti
          dan kopi yang enak untuk dinikmati bersama.
        </p>
      </section>

      <div className="relative h-75 w-full md:h-130">
        <Image
          src={aboutPhotos.outlet}
          alt="Outlet Dyvina Bakery & Coffee"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <section
        className={`${gutter} flex flex-col gap-4 py-8 md:flex-row md:items-center md:gap-20 md:py-22`}
      >
        <div className="relative hidden h-110 w-full md:block md:flex-1">
          <Image
            src={aboutPhotos.baker}
            alt="Pembuat roti Dyvina"
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-1 md:gap-5">
          <Eyebrow>Profil</Eyebrow>
          <SectionHeading className="leading-[1.2] md:leading-[1.15]">
            {site.name}
          </SectionHeading>
          <p className="text-sm leading-[1.6] text-ink-soft md:hidden">
            Dyvina berawal dari dapur kecil dengan satu tujuan: menyajikan roti
            dan kopi yang enak untuk dinikmati bersama. [Teks profil dan sejarah
            akan dikonfirmasi oleh Dyvina.]
          </p>
          <p className="hidden text-base leading-[1.65] text-ink-soft md:block">
            [Teks profil dan sejarah singkat akan dikonfirmasi oleh Dyvina.]
            Kami membuat roti, bolu, cake, cookies, serta kopi dan minuman
            non-kopi setiap hari.
          </p>
        </div>
      </section>

      <section
        className={`${gutter} flex flex-col gap-5 bg-cream-dark py-8 md:gap-10 md:py-22`}
      >
        <Eyebrow>Nilai Kami</Eyebrow>
        <SectionHeading className="hidden md:block md:leading-[1.15]">
          Yang kami pegang
        </SectionHeading>
        <ul className="flex flex-col gap-5 md:flex-row md:gap-12">
          {values.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="flex gap-3.5 md:flex-1 md:flex-col md:gap-3"
            >
              <Icon className="size-6 shrink-0 text-brand md:size-8" />
              <div className="flex flex-col gap-1 md:contents">
                <h3 className="font-heading text-lg text-ink md:text-2xl">
                  {title}
                </h3>
                <p className="text-[13px] leading-[1.6] text-ink-soft md:text-[15px] md:leading-[1.65]">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${gutter} flex flex-col gap-4 pt-8 pb-10 md:hidden`}>
        <Eyebrow>Yang Kami Sajikan</Eyebrow>
        <p className="text-sm leading-[1.6] text-ink-soft">
          Roti, bolu, cake, cookies, kopi, dan minuman non-kopi.
        </p>
        <CtaLink href="/menu" variant="primary" className="w-full">
          Lihat Menu
        </CtaLink>
      </section>

      <section
        className={`${gutter} hidden flex-col items-center gap-5 bg-ink py-22 text-center md:flex`}
      >
        <WheatIcon className="size-9 text-gold" />
        <h2 className="font-heading text-5xl text-cream">
          Cicipi sendiri hasilnya.
        </h2>
        <CtaLink href="/menu" variant="primary">
          Lihat Menu
        </CtaLink>
      </section>
    </PageShell>
  );
}
