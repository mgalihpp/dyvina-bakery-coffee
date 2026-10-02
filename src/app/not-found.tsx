import { CtaLink } from "@/components/site/cta-link";
import { PageShell } from "@/components/site/page-shell";
import { Eyebrow, gutter } from "@/components/site/section";

export default function NotFound() {
  return (
    <PageShell>
      <div
        className={`${gutter} flex flex-col items-start gap-4 py-20 md:py-32`}
      >
        <Eyebrow>404</Eyebrow>
        <h1 className="font-heading text-4xl text-ink md:text-5xl">
          Halaman tidak ditemukan.
        </h1>
        <p className="text-ink-soft">
          Halaman yang Anda cari tidak ada atau produknya sudah dihapus.
        </p>
        <CtaLink href="/menu" variant="primary">
          Lihat Menu
        </CtaLink>
      </div>
    </PageShell>
  );
}
