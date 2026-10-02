import {
  ArrowRightIcon,
  BellRingIcon,
  ChefHatIcon,
  CircleCheckIcon,
  PackageIcon,
  TagsIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  EmptyRow,
  PageTitle,
  StatusBadge,
  TableFrame,
  Td,
  Th,
} from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin-session";
import { formatOrderTime, formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { getQueryClient, trpc } from "@/trpc/server";

export const metadata: Metadata = {
  title: { absolute: "Dashboard | Admin Dyvina" },
};

export default async function AdminDashboardPage() {
  await requireAdmin();
  const data = await getQueryClient().fetchQuery(
    trpc.admin.dashboard.queryOptions(),
  );
  const now = new Date();

  const stats = [
    { label: "Total produk", value: data.products, icon: PackageIcon },
    { label: "Total kategori", value: data.categories, icon: TagsIcon },
    {
      label: "Pesanan baru",
      value: data.orders.PENDING,
      icon: BellRingIcon,
      highlight: true,
    },
    { label: "Diproses", value: data.orders.PROCESSING, icon: ChefHatIcon },
    { label: "Selesai", value: data.orders.COMPLETED, icon: CircleCheckIcon },
  ];

  return (
    <>
      <PageTitle title="Dashboard" />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 xl:grid-cols-5">
        {stats.map(({ label, value, icon: Icon, highlight }) => (
          <li
            key={label}
            className={cn(
              "flex flex-col gap-2.5 border border-line p-4 md:p-5",
              highlight && "bg-cream-dark",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13px] text-ink-soft">{label}</span>
              <Icon className="size-4.5 shrink-0 text-brand" />
            </div>
            <span className="font-heading text-[32px] leading-none text-ink md:text-[40px]">
              {value}
            </span>
          </li>
        ))}
      </ul>
      <section className="flex flex-col border border-line">
        <div className="flex items-center justify-between gap-4 px-5 py-4.5">
          <h2 className="font-heading text-[22px] text-ink">Pesanan terbaru</h2>
          <Link
            href="/admin/orders"
            className="flex items-center gap-1.5 text-[13px] font-semibold text-brand hover:underline"
          >
            Semua pesanan
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
        <div className="-mx-px -mb-px">
          <TableFrame minWidth="min-w-[640px]">
            <thead>
              <tr>
                <Th className="w-[170px]">No. pesanan</Th>
                <Th>Customer</Th>
                <Th className="w-[120px]">Waktu</Th>
                <Th className="w-[140px]">Total</Th>
                <Th className="w-[140px]">Status</Th>
              </tr>
            </thead>
            <tbody>
              {data.recentOrders.length === 0 && (
                <EmptyRow colSpan={5}>Belum ada pesanan.</EmptyRow>
              )}
              {data.recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-cream-dark/40">
                  <Td>
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="whitespace-nowrap hover:underline"
                    >
                      {order.orderNumber}
                    </Link>
                  </Td>
                  <Td>{order.customerName}</Td>
                  <Td>{formatOrderTime(order.createdAt, now)}</Td>
                  <Td>{formatRupiah(order.total)}</Td>
                  <Td>
                    <StatusBadge status={order.status} />
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableFrame>
        </div>
      </section>
    </>
  );
}
