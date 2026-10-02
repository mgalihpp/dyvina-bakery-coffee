import "server-only";

import type { z } from "zod";
import { Prisma, type PrismaClient } from "@/generated/prisma/client";
import {
  generateOrderNumber,
  normalizePhone,
  type orderInputSchema,
  priceOrder,
} from "./order";
import { getWhatsappConfig } from "./settings";
import { renderWhatsappMessage, whatsappLink } from "./whatsapp";

type OrderInput = z.infer<typeof orderInputSchema>;

export type CreateOrderResult =
  | { ok: true; orderNumber: string; whatsappUrl: string }
  | { ok: false; unavailable: string[] };

const MAX_NUMBER_ATTEMPTS = 5;

const isUniqueViolation = (error: unknown) =>
  error instanceof Prisma.PrismaClientKnownRequestError &&
  error.code === "P2002";

export async function createOrder(
  prisma: PrismaClient,
  input: OrderInput,
): Promise<CreateOrderResult> {
  const products = await prisma.product.findMany({
    where: { id: { in: input.items.map((item) => item.productId) } },
    select: { id: true, name: true, price: true, isAvailable: true },
  });
  const pricing = priceOrder(products, input.items);
  if (!pricing.ok) return pricing;

  const phone = normalizePhone(input.phone);
  if (!phone) throw new Error("phone was validated at the boundary");

  for (let attempt = 0; attempt < MAX_NUMBER_ATTEMPTS; attempt++) {
    const orderNumber = generateOrderNumber(new Date());
    try {
      await prisma.order.create({
        data: {
          orderNumber,
          customerName: input.customerName,
          phone,
          note: input.note || null,
          total: pricing.total,
          items: { create: pricing.lines },
        },
      });
    } catch (error) {
      if (isUniqueViolation(error)) continue;
      throw error;
    }

    const config = await getWhatsappConfig(prisma);
    const message = renderWhatsappMessage(config.template, {
      orderNumber,
      lines: pricing.lines,
      total: pricing.total,
      customerName: input.customerName,
      phone,
      note: input.note,
    });
    return {
      ok: true,
      orderNumber,
      whatsappUrl: whatsappLink(config.number, message),
    };
  }
  throw new Error("could not allocate a unique order number");
}
