import "server-only";

import type { z } from "zod";
import {
  type OrderStatus,
  Prisma,
  type PrismaClient,
} from "@/generated/prisma/client";
import type {
  adminOrderListInput,
  adminProductListInput,
  CategoryFormValues,
  ProductFormValues,
} from "./admin-schemas";
import { canTransition, ORDER_STATUSES } from "./order-status";

export const ORDERS_PER_PAGE = 25;
const RECENT_ORDERS = 5;

export type AdminFailure =
  | "not-found"
  | "slug-taken"
  | "has-products"
  | "invalid-transition";

export type AdminResult = { ok: true } | { ok: false; reason: AdminFailure };

const errorCode = (error: unknown) =>
  error instanceof Prisma.PrismaClientKnownRequestError ? error.code : null;

async function settle(
  write: Promise<unknown>,
  conflicts: Partial<Record<string, "slug-taken" | "has-products">>,
): Promise<AdminResult> {
  try {
    await write;
    return { ok: true };
  } catch (error) {
    const code = errorCode(error);
    if (code === "P2025") return { ok: false, reason: "not-found" };
    const reason = code && conflicts[code];
    if (reason) return { ok: false, reason };
    throw error;
  }
}

const orderRowSelect = {
  id: true,
  orderNumber: true,
  customerName: true,
  phone: true,
  total: true,
  status: true,
  createdAt: true,
} as const;

export async function getDashboard(prisma: PrismaClient) {
  const [products, categories, byStatus, recentOrders] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.order.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: RECENT_ORDERS,
      select: orderRowSelect,
    }),
  ]);
  return {
    products,
    categories,
    orders: countByStatus(byStatus),
    recentOrders,
  };
}

function countByStatus(
  groups: readonly { status: OrderStatus; _count: { _all: number } }[],
) {
  const counts = Object.fromEntries(
    ORDER_STATUSES.map((status) => [status, 0]),
  ) as Record<OrderStatus, number>;
  for (const group of groups) counts[group.status] = group._count._all;
  return counts;
}

export function listAdminCategories(prisma: PrismaClient) {
  return prisma.category.findMany({
    orderBy: [{ createdAt: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      _count: { select: { products: true } },
    },
  });
}

export function createCategory(prisma: PrismaClient, data: CategoryFormValues) {
  return settle(prisma.category.create({ data }), { P2002: "slug-taken" });
}

export function updateCategory(
  prisma: PrismaClient,
  id: string,
  data: CategoryFormValues,
) {
  return settle(prisma.category.update({ where: { id }, data }), {
    P2002: "slug-taken",
  });
}

export async function deleteCategory(
  prisma: PrismaClient,
  id: string,
): Promise<AdminResult> {
  const category = await prisma.category.findUnique({
    where: { id },
    select: { _count: { select: { products: true } } },
  });
  if (!category) return { ok: false, reason: "not-found" };
  if (category._count.products > 0)
    return { ok: false, reason: "has-products" };
  return settle(prisma.category.delete({ where: { id } }), {
    P2003: "has-products",
  });
}

export function listAdminProducts(
  prisma: PrismaClient,
  { q, categoryId, available }: z.infer<typeof adminProductListInput>,
) {
  return prisma.product.findMany({
    where: {
      ...(q && { name: { contains: q, mode: "insensitive" } }),
      ...(categoryId && { categoryId }),
      ...(available !== "all" && { isAvailable: available === "available" }),
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      image: true,
      isAvailable: true,
      category: { select: { name: true } },
    },
  });
}

export function getAdminProduct(prisma: PrismaClient, id: string) {
  return prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      slug: true,
      categoryId: true,
      price: true,
      description: true,
      image: true,
      isAvailable: true,
    },
  });
}

const productData = ({ description, ...values }: ProductFormValues) => ({
  ...values,
  description: description || null,
});

export function createProduct(prisma: PrismaClient, values: ProductFormValues) {
  return settle(prisma.product.create({ data: productData(values) }), {
    P2002: "slug-taken",
  });
}

export function updateProduct(
  prisma: PrismaClient,
  id: string,
  values: ProductFormValues,
) {
  return settle(
    prisma.product.update({ where: { id }, data: productData(values) }),
    { P2002: "slug-taken" },
  );
}

export function deleteProduct(prisma: PrismaClient, id: string) {
  return settle(prisma.product.delete({ where: { id } }), {});
}

export function setProductAvailability(
  prisma: PrismaClient,
  id: string,
  isAvailable: boolean,
) {
  return settle(
    prisma.product.update({ where: { id }, data: { isAvailable } }),
    {},
  );
}

export async function listAdminOrders(
  prisma: PrismaClient,
  { status, q, page }: z.infer<typeof adminOrderListInput>,
) {
  const search: Prisma.OrderWhereInput = q
    ? {
        OR: [
          { orderNumber: { contains: q, mode: "insensitive" } },
          { customerName: { contains: q, mode: "insensitive" } },
        ],
      }
    : {};
  const where = { ...search, ...(status && { status }) };
  const [orders, total, byStatus] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ORDERS_PER_PAGE,
      take: ORDERS_PER_PAGE,
      select: orderRowSelect,
    }),
    prisma.order.count({ where }),
    prisma.order.groupBy({
      by: ["status"],
      where: search,
      _count: { _all: true },
    }),
  ]);
  return {
    orders,
    total,
    pageCount: Math.max(1, Math.ceil(total / ORDERS_PER_PAGE)),
    counts: countByStatus(byStatus),
  };
}

export function getAdminOrder(prisma: PrismaClient, id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        orderBy: { id: "asc" },
        select: {
          id: true,
          productName: true,
          price: true,
          quantity: true,
          subtotal: true,
        },
      },
    },
  });
}

export async function updateOrderStatus(
  prisma: PrismaClient,
  id: string,
  to: OrderStatus,
): Promise<AdminResult> {
  const order = await prisma.order.findUnique({
    where: { id },
    select: { status: true },
  });
  if (!order) return { ok: false, reason: "not-found" };
  if (!canTransition(order.status, to)) {
    return { ok: false, reason: "invalid-transition" };
  }
  const { count } = await prisma.order.updateMany({
    where: { id, status: order.status },
    data: { status: to },
  });
  return count === 1
    ? { ok: true }
    : { ok: false, reason: "invalid-transition" };
}
