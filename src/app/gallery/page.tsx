import type { Metadata } from "next";
import Image from "next/image";
import { FilterChips } from "@/components/site/filter-chips";
import { PageShell } from "@/components/site/page-shell";
import { Eyebrow, gutter } from "@/components/site/section";
import { galleryCategories, galleryItems, site } from "@/lib/site";

const description =
  "Foto kue, roti, minuman, dan suasana di Dyvina Bakery & Coffee.";

export const metadata: Metadata = {
  title: "Galeri",
  description,
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: `Galeri | ${site.name}`,
    description,
    url: "/gallery",
    images: [{ url: galleryItems[0].src, alt: galleryItems[0].alt }],
  },
};

type Item = (typeof galleryItems)[number];

const desktopRows = { sizes: [3, 2, 4], heights: ["h-90", "h-110", "h-80"] };
const mobileRows = {
  sizes: [2, 1, 2, 1, 2],
  heights: ["h-45", "h-65", "h-45", "h-55", "h-45"],
};

function chunkRows(items: readonly Item[], pattern: typeof desktopRows) {
  const rows: { height: string; items: Item[] }[] = [];
  let start = 0;
  for (let index = 0; start < items.length; index++) {
    const size = pattern.sizes[index % pattern.sizes.length];
    rows.push({
      height: pattern.heights[index % pattern.heights.length],
      items: items.slice(start, start + size),
    });
    start += size;
  }
  return rows;
}

function Mosaic({
  items,
  pattern,
  gap,
  className,
}: {
  items: readonly Item[];
  pattern: typeof desktopRows;
  gap: string;
  className: string;
}) {
  return (
    <div className={`${gap} ${className}`}>
      {chunkRows(items, pattern).map((row) => (
        <ul key={row.items[0].src} className={`flex ${gap}`}>
          {row.items.map((item) => (
            <li key={item.src} className={`relative flex-1 ${row.height}`}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default async function GalleryPage({
  searchParams,
}: PageProps<"/gallery">) {
  const { category: raw } = await searchParams;
  const selected = galleryCategories.find(
    (item) => item === (Array.isArray(raw) ? raw[0] : raw),
  );
  const items = selected
    ? galleryItems.filter((item) => item.category === selected)
    : galleryItems;

  const chips = [
    { href: "/gallery", label: "Semua", active: !selected },
    ...galleryCategories.map((item) => ({
      href: `/gallery?category=${item}`,
      label: item,
      active: item === selected,
    })),
  ];

  return (
    <PageShell>
      <header
        className={`${gutter} flex flex-col gap-3 pt-7 pb-3 md:flex-row md:items-end md:justify-between md:pt-14 md:pb-4`}
      >
        <div className="flex flex-col gap-3">
          <Eyebrow>Galeri</Eyebrow>
          <h1 className="font-heading text-3xl leading-[1.2] text-ink md:text-[56px]">
            Momen di Dyvina
          </h1>
        </div>
        <FilterChips items={chips} compact className="max-md:hidden" />
      </header>
      <div className={`${gutter} py-2 md:hidden`}>
        <FilterChips items={chips} compact />
      </div>
      {items.length === 0 ? (
        <p className="py-16 text-center text-ink-soft">
          Belum ada foto di kategori ini.
        </p>
      ) : (
        <div className={`${gutter} pt-3 pb-10 md:pt-6 md:pb-22`}>
          <Mosaic
            items={items}
            pattern={mobileRows}
            gap="gap-2"
            className="flex flex-col md:hidden"
          />
          <Mosaic
            items={items}
            pattern={desktopRows}
            gap="gap-4"
            className="hidden flex-col md:flex"
          />
        </div>
      )}
    </PageShell>
  );
}
