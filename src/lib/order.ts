import { z } from "zod";

export const MAX_QUANTITY = 99;
export const MAX_ORDER_LINES = 30;

export function normalizePhone(raw: string) {
  const digits = raw.replace(/[\s\-().]/g, "");
  const match = /^(?:\+62|62|0)(8\d{7,11})$/.exec(digits);
  return match ? `62${match[1]}` : null;
}

export const customerSchema = z.object({
  customerName: z.string().trim().min(2, "Isi nama lengkap").max(80),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => normalizePhone(value) !== null,
      "Nomor WhatsApp tidak valid",
    ),
  note: z.string().trim().max(300, "Catatan terlalu panjang").optional(),
});

export const orderItemInput = z.object({
  productId: z.string().min(1).max(40),
  quantity: z.number().int().min(1).max(MAX_QUANTITY),
});

export const orderInputSchema = customerSchema.extend({
  items: z.array(orderItemInput).min(1).max(MAX_ORDER_LINES),
});

export type OrderItemInput = z.infer<typeof orderItemInput>;

type PricedProduct = {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
};

export type OrderLine = {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
};

export type Pricing =
  | { ok: true; lines: OrderLine[]; total: number }
  | { ok: false; unavailable: string[] };

// Prices come from the database rows passed in, never from the client.
export function priceOrder(
  products: readonly PricedProduct[],
  items: readonly OrderItemInput[],
): Pricing {
  const byId = new Map(products.map((product) => [product.id, product]));
  const quantities = new Map<string, number>();
  for (const { productId, quantity } of items) {
    quantities.set(
      productId,
      Math.min((quantities.get(productId) ?? 0) + quantity, MAX_QUANTITY),
    );
  }

  const lines: OrderLine[] = [];
  const unavailable: string[] = [];
  for (const [productId, quantity] of quantities) {
    const product = byId.get(productId);
    if (!product?.isAvailable) {
      unavailable.push(product?.name ?? "Produk tidak ditemukan");
      continue;
    }
    lines.push({
      productId,
      productName: product.name,
      price: product.price,
      quantity,
      subtotal: product.price * quantity,
    });
  }
  if (unavailable.length > 0) return { ok: false, unavailable };

  return {
    ok: true,
    lines,
    total: lines.reduce((sum, line) => sum + line.subtotal, 0),
  };
}

const ORDER_CODE_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

export function generateOrderNumber(
  now: Date,
  random: () => number = Math.random,
) {
  const day = now
    .toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" })
    .replaceAll("-", "");
  const code = Array.from(
    { length: 4 },
    () =>
      ORDER_CODE_ALPHABET[Math.floor(random() * ORDER_CODE_ALPHABET.length)],
  ).join("");
  return `DYV-${day}-${code}`;
}
