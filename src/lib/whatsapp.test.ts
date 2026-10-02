import { describe, expect, it } from "vitest";
import {
  DEFAULT_WHATSAPP_TEMPLATE,
  renderWhatsappMessage,
  whatsappLink,
} from "./whatsapp";

describe("renderWhatsappMessage", () => {
  const input = {
    orderNumber: "DYV-20261002-ABCD",
    lines: [
      {
        productId: "a",
        productName: "Roti Pisang",
        price: 10_000,
        quantity: 2,
        subtotal: 20_000,
      },
      {
        productId: "b",
        productName: "Latte",
        price: 20_000,
        quantity: 1,
        subtotal: 20_000,
      },
    ],
    total: 40_000,
    customerName: "Galih",
    phone: "6281234567890",
  };

  it("fills every placeholder of the default template", () => {
    const message = renderWhatsappMessage(DEFAULT_WHATSAPP_TEMPLATE, input);
    expect(message).toContain("1. Roti Pisang x2\n2. Latte x1");
    expect(message).toContain("Total: Rp 40.000");
    expect(message).toContain("Nomor WhatsApp: +6281234567890");
    expect(message).toContain("Catatan: -");
    expect(message).not.toMatch(/\{\w+\}/);
  });

  it("leaves unknown placeholders and replacement patterns untouched", () => {
    const message = renderWhatsappMessage("{unknown} {name}", {
      ...input,
      customerName: "$& Budi",
    });
    expect(message).toBe("{unknown} $& Budi");
  });
});

describe("whatsappLink", () => {
  it("strips non-digits and encodes the text", () => {
    expect(whatsappLink("+62 812-0000", "Halo & hai")).toBe(
      "https://wa.me/628120000?text=Halo%20%26%20hai",
    );
  });
});
