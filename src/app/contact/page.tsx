import { ClockIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import type { Metadata } from "next";
import { CtaLink } from "@/components/site/cta-link";
import { PageShell } from "@/components/site/page-shell";
import { Eyebrow, gutter } from "@/components/site/section";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";
import { getQueryClient, trpc } from "@/trpc/server";

const description =
  "Alamat, jam operasional, dan nomor WhatsApp Dyvina Bakery & Coffee.";

export const metadata: Metadata = {
  title: "Kontak",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Kontak | ${site.name}`,
    description,
    url: "/contact",
  },
};

const details = [
  { icon: MapPinIcon, label: "Alamat", value: site.address },
  { icon: PhoneIcon, label: "WhatsApp", value: site.phone },
  { icon: ClockIcon, label: "Jam operasional", value: site.hours },
] as const;

export default async function ContactPage() {
  const { number } = await getQueryClient().fetchQuery(
    trpc.setting.whatsapp.queryOptions(),
  );
  const whatsappButton = (className: string) => (
    <CtaLink
      href={whatsappLink(number)}
      target="_blank"
      rel="noopener noreferrer"
      variant="primary"
      className={className}
    >
      Chat via WhatsApp
    </CtaLink>
  );

  return (
    <PageShell>
      <div className="md:flex md:items-center md:gap-20 md:px-12 md:pt-18 md:pb-22 lg:px-30">
        <div className="flex flex-col md:flex-1 md:gap-7">
          <div
            className={`${gutter} flex flex-col gap-3 pt-7 pb-5 md:p-0 md:gap-7`}
          >
            <div className="flex flex-col gap-3 md:gap-7">
              <Eyebrow>Kontak</Eyebrow>
              <h1 className="font-heading text-[32px] leading-[1.2] text-ink md:text-[52px] md:leading-[1.15]">
                Mampir atau pesan lewat WhatsApp.
              </h1>
            </div>
            {whatsappButton("mt-1 w-full md:hidden")}
          </div>
          <dl
            className={`${gutter} flex flex-col gap-5.5 py-6 md:gap-7 md:p-0`}
          >
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3.5 md:gap-4">
                <Icon className="size-5.5 shrink-0 text-brand md:size-6" />
                <div className="flex flex-col gap-1">
                  <dt className="text-[11px] font-semibold tracking-[0.14em] text-ink-soft uppercase md:tracking-[0.18em]">
                    {label}
                  </dt>
                  <dd className="font-heading text-lg text-ink md:text-2xl">
                    {value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
          {whatsappButton("hidden md:inline-flex md:self-start")}
        </div>
        <div className="flex h-65 w-full flex-col items-center justify-center gap-1.5 bg-line text-xs text-ink-soft md:h-130 md:flex-1 md:gap-2 md:text-[13px]">
          <MapPinIcon className="size-8 text-brand md:size-10" />
          Google Maps
        </div>
      </div>
      <div className="h-10 md:hidden" />
    </PageShell>
  );
}
