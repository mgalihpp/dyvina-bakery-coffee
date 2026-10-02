import { describe, expect, it } from "vitest";
import { generateOrderNumber, normalizePhone, priceOrder } from "./order";

const products = [
  { id: "a", name: "Roti", price: 10_000, isAvailable: true },
  { id: "b", name: "Latte", price: 20_000, isAvailable: true },
  { id: "c", name: "Croissant", price: 15_000, isAvailable: false },
];

describe("priceOrder", () => {
  it("totals from database prices and merges duplicate lines", () => {
    const result = priceOrder(products, [
      { productId: "a", quantity: 2 },
      { productId: "b", quantity: 1 },
      { productId: "a", quantity: 1 },
    ]);
    expect(result).toEqual({
      ok: true,
      total: 50_000,
      lines: [
        {
          productId: "a",
          productName: "Roti",
          price: 10_000,
          quantity: 3,
          subtotal: 30_000,
        },
        {
          productId: "b",
          productName: "Latte",
          price: 20_000,
          quantity: 1,
          subtotal: 20_000,
        },
      ],
    });
  });

  it("rejects unavailable and unknown products", () => {
    const result = priceOrder(products, [
      { productId: "a", quantity: 1 },
      { productId: "c", quantity: 1 },
      { productId: "zzz", quantity: 1 },
    ]);
    expect(result).toEqual({
      ok: false,
      unavailable: ["Croissant", "Produk tidak ditemukan"],
    });
  });

  it("caps merged quantity at the maximum", () => {
    const result = priceOrder(products, [
      { productId: "a", quantity: 99 },
      { productId: "a", quantity: 99 },
    ]);
    expect(result.ok && result.lines[0].quantity).toBe(99);
  });
});

describe("normalizePhone", () => {
  it.each([
    ["0812-3456-7890", "6281234567890"],
    ["+62 812 3456 7890", "6281234567890"],
    ["6281234567890", "6281234567890"],
  ])("accepts %s", (input, expected) => {
    expect(normalizePhone(input)).toBe(expected);
  });

  it.each(["08xx-xxxx-xxxx", "12345", "0712345678", ""])(
    "rejects %s",
    (input) => {
      expect(normalizePhone(input)).toBeNull();
    },
  );
});

describe("generateOrderNumber", () => {
  it("uses the Jakarta date and an unambiguous code", () => {
    const number = generateOrderNumber(
      new Date("2026-10-02T18:00:00Z"),
      () => 0,
    );
    expect(number).toBe("DYV-20261003-2222");
  });
});
