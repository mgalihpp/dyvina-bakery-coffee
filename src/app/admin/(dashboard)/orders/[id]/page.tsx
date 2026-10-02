import { MessageCircleIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/admin/back-link";
import { OrderActions } from "@/components/admin/order-actions";
import {
  adminButton,
  labelClass,
  PageTitle,
  StatusBadge,
  TableFrame,
  Td,
  Th,
} from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin-session";
import { formatOrderDateTime, formatPhone, formatRupiah } from "@/lib/format";
import { whatsappLink } from "@/lib/whatsapp";
import { getQueryClient, trpc } from "@/trpc/server";

export const metadata: Metadata = { title: "Detail Pesanan" };

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs text-ink-soft">{label}</dt>
      <dd className="text-sm leading-5 break-words text-ink">{value}</dd>
    </div>
  );
}

export default async function AdminOrderPage({
  params,
}: PageProps<"/admin/orders/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const order = await getQueryClient().fetchQuery(
    trpc.admin.order.byId.queryOptions({ id: id.slice(0, 40) }),
  );
  if (!order) notFound();

  return (
    <>
      <PageTitle title={order.orderNumber} />
      <BackLink href="/admin/orders">Kembali ke pesanan</BackLink>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <section className="flex min-w-0 flex-col border border-line lg:flex-1">
          <h2 className="px-5 py-4.5 font-heading text-[22px] text-ink">
            Produk dipesan
          </h2>
          <div className="-mx-px">
            <TableFrame minWidth="min-w-[520px]">
              <thead>
                <tr>
                  <Th>Produk</Th>
                  <Th className="w-[106px]">Jumlah</Th>
                  <Th className="w-[136px]">Harga</Th>
                  <Th className="w-[136px]">Subtotal</Th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <Td>{item.productName}</Td>
                    <Td>{item.quantity}</Td>
                    <Td>{formatRupiah(item.price)}</Td>
                    <Td>{formatRupiah(item.subtotal)}</Td>
                  </tr>
                ))}
              </tbody>
            </TableFrame>
          </div>
          <div className="flex items-center justify-between gap-4 p-5">
            <span className="text-base font-semibold text-ink">Total</span>
            <span className="font-heading text-[28px] text-brand">
              {formatRupiah(order.total)}
            </span>
          </div>
        </section>
        <aside className="flex flex-col gap-5 lg:w-85">
          <section className="flex flex-col gap-3.5 border border-line p-5">
            <h2 className={labelClass}>Status pesanan</h2>
            <div>
              <StatusBadge status={order.status} />
            </div>
            <OrderActions id={order.id} status={order.status} />
          </section>
          <section className="flex flex-col gap-3.5 border border-line p-5">
            <h2 className={labelClass}>Customer</h2>
            <dl className="flex flex-col gap-3.5">
              <Detail label="Nama" value={order.customerName} />
              <Detail label="WhatsApp" value={formatPhone(order.phone)} />
              <Detail label="Catatan" value={order.note || "-"} />
              <Detail
                label="Waktu pesan"
                value={formatOrderDateTime(order.createdAt)}
              />
            </dl>
            <a
              href={whatsappLink(order.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className={adminButton(
                "outline",
                "gap-2 rounded-none px-4 py-2.75",
              )}
            >
              <MessageCircleIcon className="size-4" />
              Chat customer
            </a>
          </section>
        </aside>
      </div>
    </>
  );
}
