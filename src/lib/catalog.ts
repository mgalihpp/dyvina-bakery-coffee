import { z } from "zod";
import type { PrismaClient } from "@/generated/prisma/client";

export const FEATURED_LIMIT = 4;
export const RELATED_LIMIT = 4;

export const productListInput = z.object({
  category: z.string().max(80).optional(),
  q: z.string().trim().max(80).optional(),
});

const cardSelect = {
  id: true,
  name: true,
  slug: true,
  price: true,
  image: true,
  isAvailable: true,
  category: { select: { name: true } },
} as const;

export function listFeaturedProducts(prisma: PrismaClient) {
  return prisma.product.findMany({
    where: { isAvailable: true },
    orderBy: { createdAt: "desc" },
    take: FEATURED_LIMIT,
    select: cardSelect,
  });
}

export function listProducts(
  prisma: PrismaClient,
  { category, q }: z.infer<typeof productListInput>,
) {
  return prisma.product.findMany({
    where: {
      ...(category && { category: { slug: category } }),
      ...(q && { name: { contains: q, mode: "insensitive" } }),
    },
    orderBy: { createdAt: "desc" },
    select: cardSelect,
  });
}

export function getProductBySlug(prisma: PrismaClient, slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    select: {
      ...cardSelect,
      description: true,
      category: { select: { name: true, slug: true } },
    },
  });
}

export function listRelatedProducts(prisma: PrismaClient, slug: string) {
  return prisma.product.findMany({
    where: { slug: { not: slug }, isAvailable: true },
    orderBy: { createdAt: "desc" },
    take: RELATED_LIMIT,
    select: cardSelect,
  });
}

export function listProductsByIds(prisma: PrismaClient, ids: string[]) {
  return prisma.product.findMany({
    where: { id: { in: ids } },
    select: cardSelect,
  });
}

export function listCategories(prisma: PrismaClient) {
  return prisma.category.findMany({
    orderBy: [{ createdAt: "asc" }, { name: "asc" }],
    select: { id: true, name: true, slug: true },
  });
}

export function listProductSitemapEntries(prisma: PrismaClient) {
  return prisma.product.findMany({
    select: { slug: true, updatedAt: true },
  });
}
