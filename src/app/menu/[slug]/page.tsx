import { CheckIcon, ChevronLeftIcon, XIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/cart/add-to-cart";
import { CtaLink } from "@/components/site/cta-link";
import { PageShell } from "@/components/site/page-shell";
import { ProductCard } from "@/components/site/product-card";
import { Eyebrow, gutter } from "@/components/site/section";
import { formatRupiah } from "@/lib/format";
import { site } from "@/lib/site";
import { getQueryClient, trpc } from "@/trpc/server";

const getProduct = (slug: string) =>
  getQueryClient().fetchQuery(trpc.product.bySlug.queryOptions({ slug }));

export async function generateMetadata({
  params,
}: PageProps<"/menu/[slug]">): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return { title: "Produk tidak ditemukan" };

  const description =
    product.description ??
    `${product.name} dari ${site.name}, ${formatRupiah(product.price)}.`;
  const url = `/menu/${product.slug}`;
  return {
    title: product.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${product.name} | ${site.name}`,
      description,
      url,
      images: product.image ? [{ url: product.image, alt: product.name }] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/menu/[slug]">) {
  const { slug } = await params;
  const [product, related] = await Promise.all([
    getProduct(slug),
    getQueryClient().fetchQuery(trpc.product.related.queryOptions({ slug })),
  ]);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? undefined,
    image: product.image ?? undefined,
    category: product.category.name,
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: product.price,
      availability: product.isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: serialized JSON-LD
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`${gutter} flex items-center gap-2 py-3.5 text-xs text-ink-soft md:pt-6 md:pb-2 md:text-[13px]`}
      >
        <ChevronLeftIcon className="size-4" />
        <Link href="/menu" className="hover:underline">
          Menu
        </Link>
        <span>/</span>
        <Link
          href={`/menu?category=${product.category.slug}`}
          className="hover:underline"
        >
          {product.category.name}
        </Link>
        <span className="hidden md:inline">/</span>
        <span className="hidden text-ink md:inline">{product.name}</span>
      </nav>

      <article className="flex flex-col md:flex-row md:gap-18 md:px-12 md:pt-6 md:pb-18 lg:px-30">
        <div className="relative h-90 w-full overflow-hidden bg-line md:h-150 md:flex-1">
          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          )}
        </div>
        <div className="flex flex-col gap-3.5 px-5 py-6 md:flex-1 md:justify-center md:gap-5 md:p-0">
          <Eyebrow>{product.category.name}</Eyebrow>
          <h1 className="font-heading text-[32px] leading-[1.2] text-ink md:text-[56px] md:leading-[1.15]">
            {product.name}
          </h1>
          <div className="flex items-center justify-between md:justify-start md:gap-5">
            <p className="font-heading text-[26px] text-brand md:text-4xl">
              {formatRupiah(product.price)}
            </p>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold md:px-3 ${product.isAvailable ? "bg-[#E4EBD9] text-[#4F6B3A]" : "bg-line text-ink"}`}
            >
              {product.isAvailable ? (
                <CheckIcon className="size-3.5" />
              ) : (
                <XIcon className="size-3.5" />
              )}
              {product.isAvailable ? "Tersedia" : "Habis"}
            </span>
          </div>
          {product.description && (
            <p className="text-sm leading-[1.6] text-ink-soft md:text-base md:leading-[1.65]">
              {product.description}
            </p>
          )}
          <AddToCart product={product}>
            <CtaLink href="/menu" variant="outline" className="hidden md:flex">
              Lihat Menu Lain
            </CtaLink>
          </AddToCart>
        </div>
      </article>

      {related.length > 0 && (
        <section
          className={`${gutter} flex flex-col gap-4 pt-4 pb-10 md:gap-6 md:bg-cream-dark md:pt-6 md:pb-22`}
        >
          <Eyebrow>Produk Lain</Eyebrow>
          <ul className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {related.map((item) => (
              <li key={item.id}>
                <ProductCard product={item} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </PageShell>
  );
}
