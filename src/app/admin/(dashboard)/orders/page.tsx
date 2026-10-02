import { ChevronRightIcon, SearchIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { z } from "zod";
import {
  EmptyRow,
  fieldClass,
  PageTitle,
  StatusBadge,
  TableFrame,
  Td,
  Th,
} from "@/components/admin/ui";
import type { OrderStatus } from "@/generated/prisma/client";
import { requireAdmin } from "@/lib/admin-session";
import { formatOrderTime, formatPhone, formatRupiah } from "@/lib/format";
import { ORDER_STATUS_LABEL, ORDER_STATUSES } from "@/lib/order-status";
import { cn } from "@/lib/utils";
import { getQueryClient, trpc } from "@/trpc/server";

export const metadata: Metadata = { title: "Pesanan" };

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const statusParam = z.enum(ORDER_STATUSES).optional().catch(undefined);
const pageParam = z.coerce.number().int().min(1).max(10_000).catch(1);

function ordersHref(params: {
  status?: OrderStatus;
  q?: string;
  page?: number;
}) {
  const search = new URLSearchParams();
  if (params.status) search.set("status", params.status);
  if (params.q) search.set("q", params.q);
  if (params.page && params.page > 1) search.set("page", String(params.page));
  const query = search.toString();
  return query ? `/admin/orders?${query}` : "/admin/orders";
}

export default async function AdminOrdersPage({
  searchParams,
}: PageProps<"/admin/orders">) {
  await requireAdmin();
  const params = await searchParams;
  const status = statusParam.parse(first(params.status));
  const q = first(params.q)?.trim().slice(0, 80) || undefined;
  const page = pageParam.parse(first(params.page) ?? 1);

  const { orders, counts, pageCount } = await getQueryClient().fetchQuery(
    trpc.admin.order.list.queryOptions({ status, q, page }),
  );
  const now = new Date();
  const all = ORDER_STATUSES.reduce((sum, key) => sum + counts[key], 0);
  const tabs = [
    { status: undefined, label: "Semua", count: all },
    ...ORDER_STATUSES.map((key) => ({
      status: key,
      label: ORDER_STATUS_LABEL[key],
      count: counts[key],
    })),
  ];

  return (
    <>
      <PageTitle title="Pesanan" />
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <nav aria-label="Status pesanan" className="-mx-4 overflow-x-auto px-4">
          <ul className="flex gap-2">
            {tabs.map((tab) => {
              const active = tab.status === status;
              return (
                <li key={tab.label} className="shrink-0">
                  <Link
                    href={ordersHref({ status: tab.status, q })}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 rounded-[4px] px-3.5 py-2.25 text-[13px] font-semibold",
                      active
                        ? "bg-brand text-cream"
                        : "border border-line text-ink hover:bg-ink/5",
                    )}
                  >
                    {tab.label}
                    <span
                      className={cn(
                        "text-xs font-normal",
                        active ? "text-[#E6DDBF]" : "text-ink-soft",
                      )}
                    >
                      {tab.count}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <search className="lg:ml-auto lg:w-75">
          <form action="/admin/orders">
            {status && <input type="hidden" name="status" value={status} />}
            <label
              className={cn(
                fieldClass,
                "flex h-11 items-center gap-2.5 focus-within:border-brand",
              )}
            >
              <SearchIcon className="size-4.5 shrink-0 text-ink-soft" />
              <input
                type="search"
                name="q"
                defaultValue={q}
                maxLength={80}
                placeholder="Cari no. pesanan atau nama"
                aria-label="Cari pesanan"
                className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#8F897D]"
              />
            </label>
          </form>
        </search>
      </div>
      <TableFrame minWidth="min-w-[820px]">
        <thead>
          <tr>
            <Th className="w-[186px]">No. pesanan</Th>
            <Th>Customer</Th>
            <Th className="w-[176px]">WhatsApp</Th>
            <Th className="w-[126px]">Waktu</Th>
            <Th className="w-[156px]">Total</Th>
            <Th className="w-[156px]">Status</Th>
            <Th className="w-[44px]">
              <span className="sr-only">Detail</span>
            </Th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 && (
            <EmptyRow colSpan={7}>
              {q || status
                ? "Tidak ada pesanan yang cocok."
                : "Belum ada pesanan."}
            </EmptyRow>
          )}
          {orders.map((order) => (
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
              <Td>{formatPhone(order.phone)}</Td>
              <Td>{formatOrderTime(order.createdAt, now)}</Td>
              <Td>{formatRupiah(order.total)}</Td>
              <Td>
                <StatusBadge status={order.status} />
              </Td>
              <Td>
                <Link
                  href={`/admin/orders/${order.id}`}
                  aria-label={`Detail ${order.orderNumber}`}
                  className="flex text-ink-soft hover:text-ink"
                >
                  <ChevronRightIcon className="size-4.5" />
                </Link>
              </Td>
            </tr>
          ))}
        </tbody>
      </TableFrame>
      {pageCount > 1 && (
        <nav
          aria-label="Halaman"
          className="flex items-center justify-between gap-4 text-[13px] text-ink-soft"
        >
          <span>
            Halaman {page} dari {pageCount}
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={ordersHref({ status, q, page: page - 1 })}
                className="rounded-[4px] border border-line px-3.5 py-2 font-semibold text-ink hover:bg-ink/5"
              >
                Sebelumnya
              </Link>
            )}
            {page < pageCount && (
              <Link
                href={ordersHref({ status, q, page: page + 1 })}
                className="rounded-[4px] border border-line px-3.5 py-2 font-semibold text-ink hover:bg-ink/5"
              >
                Berikutnya
              </Link>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
