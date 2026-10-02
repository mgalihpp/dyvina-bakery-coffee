import { SearchIcon } from "lucide-react";
import type { Metadata } from "next";
import { FilterChips } from "@/components/site/filter-chips";
import { PageShell } from "@/components/site/page-shell";
import { ProductCard } from "@/components/site/product-card";
import { Eyebrow, gutter } from "@/components/site/section";
import { site } from "@/lib/site";
import { getQueryClient, trpc } from "@/trpc/server";

const description =
  "Daftar roti, bolu, cake, cookies, kopi, dan minuman non-kopi dari Dyvina Bakery & Coffee beserta harganya.";

export const metadata: Metadata = {
  title: "Menu",
  description,
  alternates: { canonical: "/menu" },
  openGraph: { title: `Menu | ${site.name}`, description, url: "/menu" },
};

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function MenuPage({ searchParams }: PageProps<"/menu">) {
  const params = await searchParams;
  const category = first(params.category) || undefined;
  const q = first(params.q)?.trim().slice(0, 80) || undefined;

  const queryClient = getQueryClient();
  const [categories, products] = await Promise.all([
    queryClient.fetchQuery(trpc.category.list.queryOptions()),
    queryClient.fetchQuery(trpc.product.list.queryOptions({ category, q })),
  ]);

  const withQuery = (slug?: string) => {
    const search = new URLSearchParams();
    if (slug) search.set("category", slug);
    if (q) search.set("q", q);
    const query = search.toString();
    return query ? `/menu?${query}` : "/menu";
  };

  const chips = [
    { href: withQuery(), label: "Semua", active: !category },
    ...categories.map((item) => ({
      href: withQuery(item.slug),
      label: item.name,
      active: item.slug === category,
    })),
  ];

  return (
    <PageShell>
      <div className="flex flex-col">
        <header
          className={`${gutter} flex flex-col gap-4 pt-7 pb-2 md:flex-row md:items-end md:justify-between md:pt-14 md:pb-4`}
        >
          <div className="flex flex-col gap-3">
            <Eyebrow>{site.name}</Eyebrow>
            <h1 className="font-heading text-3xl leading-[1.2] text-ink md:text-[56px]">
              Menu
            </h1>
          </div>
          <search className="md:w-90">
            <form action="/menu">
              {category && (
                <input type="hidden" name="category" value={category} />
              )}
              <label className="flex h-12 items-center gap-3 border border-line bg-[#FBF9F4] px-3.5 focus-within:border-brand md:px-4">
                <SearchIcon className="size-4.5 shrink-0 text-ink-soft" />
                <input
                  type="search"
                  name="q"
                  defaultValue={q}
                  maxLength={80}
                  placeholder="Cari roti, kue, atau minuman"
                  aria-label="Cari produk"
                  className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft"
                />
              </label>
            </form>
          </search>
        </header>
        <div
          className={`${gutter} flex items-center justify-between gap-6 py-2 md:py-4`}
        >
          <FilterChips items={chips} />
          <p className="hidden shrink-0 text-[13px] text-ink-soft md:block">
            {products.length} produk
          </p>
        </div>
        <div
          className={`${gutter} flex flex-col gap-6 pt-4 pb-10 md:gap-10 md:pb-22`}
        >
          <p className="text-xs text-ink-soft md:hidden">
            {products.length} produk
          </p>
          {products.length === 0 ? (
            <p className="py-16 text-center text-ink-soft">
              Tidak ada produk yang cocok. Coba kata kunci atau kategori lain.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-10 lg:grid-cols-4">
              {products.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </PageShell>
  );
}
