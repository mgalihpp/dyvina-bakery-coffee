import { formatRupiah } from "./format";
import type { OrderLine } from "./order";

export const DEFAULT_WHATSAPP_TEMPLATE = `Halo Dyvina Bakery & Coffee,

Saya ingin melakukan pemesanan {orderNumber}:

{items}

Total: {total}

Nama: {name}
Nomor WhatsApp: {phone}
Catatan: {note}`;

type MessageInput = {
  orderNumber: string;
  lines: readonly OrderLine[];
  total: number;
  customerName: string;
  phone: string;
  note?: string;
};

export function renderWhatsappMessage(template: string, input: MessageInput) {
  const values: Record<string, string> = {
    orderNumber: input.orderNumber,
    items: input.lines
      .map(
        (line, index) => `${index + 1}. ${line.productName} x${line.quantity}`,
      )
      .join("\n"),
    total: formatRupiah(input.total),
    name: input.customerName,
    phone: `+${input.phone}`,
    note: input.note || "-",
  };
  return template.replace(
    /\{(\w+)\}/g,
    (match, key: string) => values[key] ?? match,
  );
}

export function whatsappLink(number: string, text?: string) {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
