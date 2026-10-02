import { Eyebrow, gutter, SectionHeading } from "@/components/site/section";

const reasons = [
  { title: "Dipanggang segar", body: "Dibuat setiap hari dari bahan pilihan." },
  {
    title: "Pesan lewat WhatsApp",
    body: "Pilih menu, kirim pesanan, selesai.",
  },
  { title: "Harga jelas", body: "Harga dan ketersediaan selalu terbaru." },
] as const;

export function WhyDyvina() {
  return (
    <section
      className={`${gutter} flex flex-col gap-6 py-10 md:gap-10 md:py-20`}
    >
      <Eyebrow>Kenapa Dyvina</Eyebrow>
      <SectionHeading>Segar, jujur, dan mudah dipesan.</SectionHeading>
      <ol className="flex flex-col gap-6 md:flex-row md:gap-12">
        {reasons.map((reason, index) => (
          <li
            key={reason.title}
            className="flex gap-4 md:flex-1 md:flex-col md:gap-2.5"
          >
            <span className="font-heading text-3xl font-light text-brand md:text-[44px]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-1 md:gap-2.5">
              <h3 className="font-heading text-lg text-ink md:text-[22px]">
                {reason.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-ink-soft md:text-[15px] md:leading-[1.65]">
                {reason.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
