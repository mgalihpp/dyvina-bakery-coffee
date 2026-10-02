import { ClockIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { Eyebrow, gutter, SectionHeading } from "@/components/site/section";
import { site } from "@/lib/site";

const details = [
  { icon: MapPinIcon, text: site.address },
  { icon: ClockIcon, text: site.hours },
  { icon: PhoneIcon, text: site.phone },
] as const;

export function Location() {
  return (
    <section
      className={`${gutter} flex flex-col gap-4 bg-cream-dark py-8 md:flex-row md:items-center md:gap-16 md:py-18`}
    >
      <div className="flex flex-col gap-4 md:flex-1 md:gap-5">
        <Eyebrow>Lokasi</Eyebrow>
        <SectionHeading>Kunjungi Kami</SectionHeading>
        <ul className="flex flex-col gap-3 md:gap-3.5">
          {details.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-3 text-sm text-ink-soft md:gap-3.5 md:text-base"
            >
              <Icon className="size-4.5 shrink-0 text-brand md:size-5" />
              {text}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex h-40 w-full flex-col items-center justify-center gap-1.5 bg-line text-xs text-ink-soft md:h-80 md:flex-1 md:text-[13px]">
        <MapPinIcon className="size-7 text-brand md:size-9" />
        Google Maps
      </div>
    </section>
  );
}
