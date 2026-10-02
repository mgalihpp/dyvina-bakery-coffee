import { InfoIcon } from "lucide-react";
import type { Metadata } from "next";
import {
  AddCategoryButton,
  CategoryRowActions,
} from "@/components/admin/category-dialog";
import { EmptyRow, PageTitle, TableFrame, Td, Th } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin-session";
import { getQueryClient, trpc } from "@/trpc/server";

export const metadata: Metadata = { title: "Kategori" };

export default async function AdminCategoriesPage() {
  await requireAdmin();
  const categories = await getQueryClient().fetchQuery(
    trpc.admin.category.list.queryOptions(),
  );

  return (
    <>
      <PageTitle title="Kategori">
        <AddCategoryButton />
      </PageTitle>
      <TableFrame minWidth="min-w-[560px]">
        <thead>
          <tr>
            <Th>Nama kategori</Th>
            <Th className="w-[276px]">Slug</Th>
            <Th className="w-[176px]">Jumlah produk</Th>
            <Th className="w-[130px]">Aksi</Th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 && (
            <EmptyRow colSpan={4}>
              Belum ada kategori. Tambah kategori pertama.
            </EmptyRow>
          )}
          {categories.map(({ _count, ...category }) => (
            <tr key={category.id}>
              <Td>{category.name}</Td>
              <Td>{category.slug}</Td>
              <Td>{_count.products} produk</Td>
              <Td className="py-2.5">
                <CategoryRowActions
                  category={category}
                  productCount={_count.products}
                />
              </Td>
            </tr>
          ))}
        </tbody>
      </TableFrame>
      <p className="flex items-center gap-2.5 bg-cream-dark px-4 py-3.5 text-[13px] text-ink-soft">
        <InfoIcon className="size-4.5 shrink-0 text-brand" />
        Kategori yang masih punya produk tidak bisa dihapus. Pindahkan atau
        hapus produknya dulu.
      </p>
    </>
  );
}
