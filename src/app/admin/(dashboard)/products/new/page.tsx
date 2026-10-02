import type { Metadata } from "next";
import { BackLink } from "@/components/admin/back-link";
import { ProductForm } from "@/components/admin/product-form";
import { PageTitle } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin-session";
import { getQueryClient, trpc } from "@/trpc/server";

export const metadata: Metadata = { title: "Tambah Produk" };

export default async function NewProductPage() {
  await requireAdmin();
  const categories = await getQueryClient().fetchQuery(
    trpc.admin.category.list.queryOptions(),
  );

  return (
    <>
      <PageTitle title="Tambah Produk" />
      <BackLink href="/admin/products">Kembali ke produk</BackLink>
      <ProductForm categories={categories} />
    </>
  );
}
