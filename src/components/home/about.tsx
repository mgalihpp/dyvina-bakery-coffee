import { WheatIcon } from "lucide-react";
import Image from "next/image";
import { CtaLink } from "@/components/site/cta-link";
import { Eyebrow, gutter, SectionHeading } from "@/components/site/section";
import { photos } from "@/lib/site";

export function About() {
  return (
    <section
      className={`${gutter} flex flex-col gap-5 py-8 md:flex-row md:items-center md:gap-20 md:pt-10 md:pb-20`}
    >
      <div className="flex flex-col gap-5 md:flex-1">
        <WheatIcon className="size-7 text-brand md:size-9" />
        <Eyebrow>Tentang Dyvina</Eyebrow>
        <SectionHeading className="leading-[1.15]">
          Dibuat dengan tangan, disajikan dengan hangat.
        </SectionHeading>
        <p className="text-sm leading-relaxed text-ink-soft md:text-base md:leading-[1.65]">
          Dyvina Bakery & Coffee menghadirkan roti, kue, dan minuman yang dibuat
          segar setiap hari untuk menemani pagi, siang, dan sore Anda.
        </p>
        <CtaLink href="/about" variant="outline" className="self-start">
          Kenali Dyvina
        </CtaLink>
      </div>
      <div className="relative h-55 w-full md:h-115 md:flex-1">
        <Image
          src={photos.about}
          alt="Roti buatan Dyvina"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
