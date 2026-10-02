import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  getProductBySlug,
  listCategories,
  listFeaturedProducts,
  listProducts,
  listProductsByIds,
  listRelatedProducts,
  productListInput,
} from "@/lib/catalog";
import { MAX_ORDER_LINES, orderInputSchema } from "@/lib/order";
import { createOrder } from "@/lib/orders";
import { getWhatsappConfig } from "@/lib/settings";
import { createTRPCRouter, publicProcedure } from "../init";
import { adminRouter } from "./admin";

export const appRouter = createTRPCRouter({
  health: publicProcedure.query(() => ({ ok: true })),
  admin: adminRouter,
  product: createTRPCRouter({
    featured: publicProcedure.query(({ ctx }) =>
      listFeaturedProducts(ctx.prisma),
    ),
    list: publicProcedure
      .input(productListInput)
      .query(({ ctx, input }) => listProducts(ctx.prisma, input)),
    bySlug: publicProcedure
      .input(z.object({ slug: z.string().max(200) }))
      .query(({ ctx, input }) => getProductBySlug(ctx.prisma, input.slug)),
    byIds: publicProcedure
      .input(
        z.object({ ids: z.array(z.string().max(40)).max(MAX_ORDER_LINES) }),
      )
      .query(({ ctx, input }) => listProductsByIds(ctx.prisma, input.ids)),
    related: publicProcedure
      .input(z.object({ slug: z.string().max(200) }))
      .query(({ ctx, input }) => listRelatedProducts(ctx.prisma, input.slug)),
  }),
  order: createTRPCRouter({
    create: publicProcedure
      .input(orderInputSchema)
      .mutation(async ({ ctx, input }) => {
        const result = await createOrder(ctx.prisma, input);
        if (!result.ok) {
          throw new TRPCError({
            code: "CONFLICT",
            message: `Produk tidak tersedia: ${result.unavailable.join(", ")}`,
          });
        }
        return {
          orderNumber: result.orderNumber,
          whatsappUrl: result.whatsappUrl,
        };
      }),
  }),
  setting: createTRPCRouter({
    whatsapp: publicProcedure.query(async ({ ctx }) => ({
      number: (await getWhatsappConfig(ctx.prisma)).number,
    })),
  }),
  category: createTRPCRouter({
    list: publicProcedure.query(({ ctx }) => listCategories(ctx.prisma)),
  }),
});

export type AppRouter = typeof appRouter;
