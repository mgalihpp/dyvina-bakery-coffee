import { describe, expect, it } from "vitest";
import { addItem, joinCart, removeItems, setItemQuantity } from "./cart";

describe("cart reducers", () => {
  it("adds new items and merges existing ones", () => {
    let items = addItem([], "a", 2);
    items = addItem(items, "b", 1);
    items = addItem(items, "a", 3);
    expect(items).toEqual([
      { productId: "a", quantity: 5 },
      { productId: "b", quantity: 1 },
    ]);
  });

  it("clamps quantity to 1..99", () => {
    const items = [{ productId: "a", quantity: 1 }];
    expect(setItemQuantity(items, "a", 0)[0].quantity).toBe(1);
    expect(setItemQuantity(items, "a", 500)[0].quantity).toBe(99);
  });

  it("removes the given ids", () => {
    const items = [
      { productId: "a", quantity: 1 },
      { productId: "b", quantity: 1 },
    ];
    expect(removeItems(items, ["a"])).toEqual([
      { productId: "b", quantity: 1 },
    ]);
  });
});

describe("joinCart", () => {
  const product = (id: string, price: number, isAvailable = true) => ({
    id,
    name: id,
    slug: id,
    price,
    image: null,
    isAvailable,
  });

  it("uses live prices, excludes unavailable lines from the total, and reports missing ids", () => {
    const cart = joinCart(
      [
        { productId: "a", quantity: 2 },
        { productId: "b", quantity: 1 },
        { productId: "gone", quantity: 1 },
      ],
      [product("a", 10_000), product("b", 15_000, false)],
    );
    expect(cart.total).toBe(20_000);
    expect(cart.itemCount).toBe(3);
    expect(cart.hasUnavailable).toBe(true);
    expect(cart.missingIds).toEqual(["gone"]);
  });
});
