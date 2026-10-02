import type { PrismaClient } from "@/generated/prisma/client";
import { site } from "./site";
import { DEFAULT_WHATSAPP_TEMPLATE } from "./whatsapp";

export const WHATSAPP_NUMBER_KEY = "whatsapp_number";
export const WHATSAPP_TEMPLATE_KEY = "whatsapp_template";

export async function getWhatsappConfig(prisma: PrismaClient) {
  const rows = await prisma.setting.findMany({
    where: { key: { in: [WHATSAPP_NUMBER_KEY, WHATSAPP_TEMPLATE_KEY] } },
  });
  const values = new Map(rows.map((row) => [row.key, row.value]));
  return {
    number: values.get(WHATSAPP_NUMBER_KEY) || site.whatsapp,
    template: values.get(WHATSAPP_TEMPLATE_KEY) || DEFAULT_WHATSAPP_TEMPLATE,
  };
}
