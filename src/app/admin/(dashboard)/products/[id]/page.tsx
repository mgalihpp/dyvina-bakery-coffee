import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/admin/back-link";
import { ProductForm } from "@/components/admin/product-form";
import { PageTitle } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin-session";
import { getQueryClient, trpc } from "@/trpc/server";

export const metadata: Metadata = { title: "Ubah Produk" };

export default async function EditProductPage({
  params,
}: PageProps<"/admin/products/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const queryClient = getQueryClient();
  const [product, categories] = await Promise.all([
    queryClient.fetchQuery(
      trpc.admin.product.byId.queryOptions({ id: id.slice(0, 40) }),
    ),
    queryClient.fetchQuery(trpc.admin.category.list.queryOptions()),
  ]);
  if (!product) notFound();

  return (
    <>
      <PageTitle title="Ubah Produk" />
      <BackLink href="/admin/products">Kembali ke produk</BackLink>
      <ProductForm
        product={{ ...product, description: product.description ?? "" }}
        categories={categories}
      />
    </>
  );
}
