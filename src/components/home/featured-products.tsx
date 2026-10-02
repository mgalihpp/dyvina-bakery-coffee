import { ProductCard } from "@/components/site/product-card";
import {
  ArrowLink,
  Eyebrow,
  gutter,
  SectionHeading,
} from "@/components/site/section";
import { getQueryClient, trpc } from "@/trpc/server";

export async function FeaturedProducts() {
  const products = await getQueryClient().fetchQuery(
    trpc.product.featured.queryOptions(),
  );

  return (
    <section className={`${gutter} flex flex-col gap-5 py-8 md:gap-8 md:py-18`}>
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2 md:gap-3">
          <Eyebrow>Pilihan Favorit</Eyebrow>
          <SectionHeading>Produk Unggulan</SectionHeading>
        </div>
        <div className="hidden md:block">
          <ArrowLink href="/menu">Lihat semua menu</ArrowLink>
        </div>
      </div>
      {products.length === 0 ? (
        <p className="py-8 text-ink-soft">Menu segera hadir.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
      <div className="md:hidden">
        <ArrowLink href="/menu">Lihat semua menu</ArrowLink>
      </div>
    </section>
  );
}

export function FeaturedProductsSkeleton() {
  return (
    <section className={`${gutter} py-8 md:py-18`} aria-hidden>
      <div className="mb-8 h-16 w-64 bg-line/60" />
      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder list
          <div key={i} className="aspect-square bg-line/60" />
        ))}
      </div>
    </section>
  );
}
