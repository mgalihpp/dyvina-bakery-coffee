import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  type AdminFailure,
  type AdminResult,
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  getAdminOrder,
  getAdminProduct,
  getDashboard,
  listAdminCategories,
  listAdminOrders,
  listAdminProducts,
  setProductAvailability,
  updateCategory,
  updateOrderStatus,
  updateProduct,
} from "@/lib/admin";
import {
  adminOrderListInput,
  adminProductListInput,
  categoryFormSchema,
  idInput,
  orderStatusInput,
  productFormSchema,
} from "@/lib/admin-schemas";
import { adminProcedure, createTRPCRouter } from "../init";

const failures: Record<
  AdminFailure,
  { code: TRPCError["code"]; message: string }
> = {
  "not-found": { code: "NOT_FOUND", message: "Data tidak ditemukan." },
  "slug-taken": {
    code: "CONFLICT",
    message: "Slug sudah dipakai. Gunakan slug lain.",
  },
  "has-products": {
    code: "CONFLICT",
    message:
      "Kategori masih punya produk. Pindahkan atau hapus produknya dulu.",
  },
  "invalid-transition": {
    code: "BAD_REQUEST",
    message: "Status pesanan sudah berubah. Muat ulang halaman.",
  },
};

function unwrap(result: AdminResult) {
  if (!result.ok) throw new TRPCError(failures[result.reason]);
}

export const adminRouter = createTRPCRouter({
  dashboard: adminProcedure.query(({ ctx }) => getDashboard(ctx.prisma)),
  category: createTRPCRouter({
    list: adminProcedure.query(({ ctx }) => listAdminCategories(ctx.prisma)),
    create: adminProcedure
      .input(categoryFormSchema)
      .mutation(async ({ ctx, input }) =>
        unwrap(await createCategory(ctx.prisma, input)),
      ),
    update: adminProcedure
      .input(categoryFormSchema.extend(idInput.shape))
      .mutation(async ({ ctx, input: { id, ...data } }) =>
        unwrap(await updateCategory(ctx.prisma, id, data)),
      ),
    delete: adminProcedure
      .input(idInput)
      .mutation(async ({ ctx, input }) =>
        unwrap(await deleteCategory(ctx.prisma, input.id)),
      ),
  }),
  product: createTRPCRouter({
    list: adminProcedure
      .input(adminProductListInput)
      .query(({ ctx, input }) => listAdminProducts(ctx.prisma, input)),
    byId: adminProcedure
      .input(idInput)
      .query(({ ctx, input }) => getAdminProduct(ctx.prisma, input.id)),
    create: adminProcedure
      .input(productFormSchema)
      .mutation(async ({ ctx, input }) =>
        unwrap(await createProduct(ctx.prisma, input)),
      ),
    update: adminProcedure
      .input(productFormSchema.extend(idInput.shape))
      .mutation(async ({ ctx, input: { id, ...values } }) =>
        unwrap(await updateProduct(ctx.prisma, id, values)),
      ),
    delete: adminProcedure
      .input(idInput)
      .mutation(async ({ ctx, input }) =>
        unwrap(await deleteProduct(ctx.prisma, input.id)),
      ),
    setAvailability: adminProcedure
      .input(idInput.extend({ isAvailable: z.boolean() }))
      .mutation(async ({ ctx, input }) =>
        unwrap(
          await setProductAvailability(ctx.prisma, input.id, input.isAvailable),
        ),
      ),
  }),
  order: createTRPCRouter({
    list: adminProcedure
      .input(adminOrderListInput)
      .query(({ ctx, input }) => listAdminOrders(ctx.prisma, input)),
    byId: adminProcedure
      .input(idInput)
      .query(({ ctx, input }) => getAdminOrder(ctx.prisma, input.id)),
    setStatus: adminProcedure
      .input(orderStatusInput)
      .mutation(async ({ ctx, input }) =>
        unwrap(await updateOrderStatus(ctx.prisma, input.id, input.to)),
      ),
  }),
});
