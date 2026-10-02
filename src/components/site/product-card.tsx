import Image from "next/image";
import Link from "next/link";
import { CardAddButton } from "@/components/cart/card-add-button";
import { formatRupiah } from "@/lib/format";

export type ProductCardData = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string | null;
  isAvailable: boolean;
  category: { name: string };
};

export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <div className="flex h-full flex-col justify-between gap-2.5 md:gap-3">
      <Link
        href={`/menu/${product.slug}`}
        className="group flex flex-col gap-2.5 md:gap-3"
      >
        <div className="relative aspect-167/150 w-full overflow-hidden bg-line md:aspect-square">
          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className={`object-cover transition-transform duration-300 group-hover:scale-105 ${product.isAvailable ? "" : "opacity-60 grayscale"}`}
            />
          )}
          {!product.isAvailable && (
            <span className="absolute top-2 left-2 bg-ink px-2.5 py-1 text-[11px] font-semibold tracking-wide text-cream">
              Habis
            </span>
          )}
        </div>
        <p className="text-[10px] font-semibold tracking-[0.15em] text-brand uppercase md:text-[11px] md:tracking-[0.18em]">
          {product.category.name}
        </p>
        <p className="font-heading text-[17px] leading-snug text-ink md:text-[22px]">
          {product.name}
        </p>
      </Link>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-ink md:text-base">
          {product.isAvailable ? formatRupiah(product.price) : "Habis"}
        </p>
        <CardAddButton
          productId={product.id}
          name={product.name}
          disabled={!product.isAvailable}
        />
      </div>
    </div>
  );
}
