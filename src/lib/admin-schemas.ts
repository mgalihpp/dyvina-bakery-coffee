import { z } from "zod";
import { ORDER_STATUSES } from "./order-status";
import { SLUG_MAX, SLUG_PATTERN } from "./slug";

export const MAX_PRICE = 100_000_000;

const slug = z
  .string()
  .trim()
  .min(1, "Isi slug")
  .max(SLUG_MAX, "Slug terlalu panjang")
  .regex(SLUG_PATTERN, "Gunakan huruf kecil, angka, dan tanda hubung");

export const idInput = z.object({ id: z.string().min(1).max(40) });

export const categoryFormSchema = z.object({
  name: z.string().trim().min(1, "Isi nama kategori").max(60),
  slug,
});

export const productFormSchema = z.object({
  name: z.string().trim().min(1, "Isi nama produk").max(120),
  slug,
  categoryId: z.string().min(1, "Pilih kategori").max(40),
  price: z
    .number({ error: "Isi harga" })
    .int("Harga harus bilangan bulat")
    .min(0, "Harga tidak boleh negatif")
    .max(MAX_PRICE, "Harga terlalu besar"),
  description: z.string().trim().max(2000, "Deskripsi terlalu panjang"),
  image: z.url().max(500).nullable(),
  isAvailable: z.boolean(),
});

export const availabilityFilter = z.enum(["all", "available", "unavailable"]);

export const adminProductListInput = z.object({
  q: z.string().trim().max(80).optional(),
  categoryId: z.string().max(40).optional(),
  available: availabilityFilter.default("all"),
});

export const adminOrderListInput = z.object({
  status: z.enum(ORDER_STATUSES).optional(),
  q: z.string().trim().max(80).optional(),
  page: z.number().int().min(1).max(10_000).default(1),
});

export const orderStatusInput = idInput.extend({
  to: z.enum(ORDER_STATUSES),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
export type ProductFormValues = z.infer<typeof productFormSchema>;
