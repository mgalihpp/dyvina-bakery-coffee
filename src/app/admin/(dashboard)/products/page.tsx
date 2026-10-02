import { ImageIcon, SearchIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FilterSelect } from "@/components/admin/filter-select";
import {
  AvailabilitySwitch,
  ProductRowActions,
} from "@/components/admin/product-actions";
import {
  adminButton,
  EmptyRow,
  fieldClass,
  PageTitle,
  TableFrame,
  Td,
  Th,
} from "@/components/admin/ui";
import { availabilityFilter } from "@/lib/admin-schemas";
import { requireAdmin } from "@/lib/admin-session";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { getQueryClient, trpc } from "@/trpc/server";

export const metadata: Metadata = { title: "Produk" };

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function AdminProductsPage({
  searchParams,
}: PageProps<"/admin/products">) {
  await requireAdmin();
  const params = await searchParams;
  const q = first(params.q)?.trim().slice(0, 80) || undefined;
  const categoryId = first(params.category)?.slice(0, 40) || undefined;
  const available = availabilityFilter.catch("all").parse(first(params.status));

  const queryClient = getQueryClient();
  const [categories, products] = await Promise.all([
    queryClient.fetchQuery(trpc.admin.category.list.queryOptions()),
    queryClient.fetchQuery(
      trpc.admin.product.list.queryOptions({ q, categoryId, available }),
    ),
  ]);
  const filtered = Boolean(q || categoryId || available !== "all");

  return (
    <>
      <PageTitle title="Produk">
        <Link href="/admin/products/new" className={adminButton("primary")}>
          Tambah Produk
        </Link>
      </PageTitle>
      <search>
        <form
          action="/admin/products"
          className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <label
            className={cn(
              fieldClass,
              "flex h-11 items-center gap-2.5 focus-within:border-brand sm:w-80",
            )}
          >
            <SearchIcon className="size-4.5 shrink-0 text-ink-soft" />
            <input
              type="search"
              name="q"
              defaultValue={q}
              maxLength={80}
              placeholder="Cari produk"
              aria-label="Cari produk"
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#8F897D]"
            />
          </label>
          <FilterSelect
            name="category"
            defaultValue={categoryId ?? ""}
            aria-label="Kategori"
          >
            <option value="">Semua kategori</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect
            name="status"
            defaultValue={available}
            aria-label="Status"
          >
            <option value="all">Semua status</option>
            <option value="available">Tersedia</option>
            <option value="unavailable">Habis</option>
          </FilterSelect>
        </form>
      </search>
      <TableFrame minWidth="min-w-[760px]">
        <thead>
          <tr>
            <Th className="w-[76px]">Foto</Th>
            <Th>Nama produk</Th>
            <Th className="w-[146px]">Kategori</Th>
            <Th className="w-[136px]">Harga</Th>
            <Th className="w-[166px]">Ketersediaan</Th>
            <Th className="w-[110px]">Aksi</Th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <EmptyRow colSpan={6}>
              {filtered
                ? "Tidak ada produk yang cocok dengan filter."
                : "Belum ada produk. Tambah produk pertama."}
            </EmptyRow>
          )}
          {products.map((product) => (
            <tr key={product.id}>
              <Td className="py-3">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt=""
                    width={56}
                    height={56}
                    className="size-14 max-w-none object-cover"
                  />
                ) : (
                  <span className="flex size-14 items-center justify-center bg-cream-dark text-ink-soft">
                    <ImageIcon className="size-5" />
                  </span>
                )}
              </Td>
              <Td>
                <Link
                  href={`/admin/products/${product.id}`}
                  className="hover:underline"
                >
                  {product.name}
                </Link>
              </Td>
              <Td>{product.category.name}</Td>
              <Td>{formatRupiah(product.price)}</Td>
              <Td>
                <AvailabilitySwitch
                  id={product.id}
                  name={product.name}
                  isAvailable={product.isAvailable}
                />
              </Td>
              <Td>
                <ProductRowActions id={product.id} name={product.name} />
              </Td>
            </tr>
          ))}
        </tbody>
      </TableFrame>
    </>
  );
}
