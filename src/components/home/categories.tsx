import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { Eyebrow, gutter, SectionHeading } from "@/components/site/section";
import { getQueryClient, trpc } from "@/trpc/server";

export async function Categories() {
  const categories = await getQueryClient().fetchQuery(
    trpc.category.list.queryOptions(),
  );
  if (categories.length === 0) return null;

  return (
    <section
      className={`${gutter} flex flex-col gap-4 bg-cream-dark py-8 md:gap-7 md:py-18`}
    >
      <Eyebrow>Kategori</Eyebrow>
      <SectionHeading>Temukan Favorit Anda</SectionHeading>
      <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-6">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/menu?category=${category.slug}`}
              className="flex h-full items-center justify-between border border-line p-4 transition-colors hover:bg-cream md:flex-col md:items-start md:gap-4 md:px-5 md:py-7"
            >
              <span className="font-heading text-[17px] text-ink md:order-2 md:text-[22px]">
                {category.name}
              </span>
              <ArrowUpRightIcon className="size-4 text-brand md:order-1 md:size-[18px]" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
