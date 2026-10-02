import { MAX_QUANTITY } from "./order";

export type CartItem = { productId: string; quantity: number };

const clamp = (quantity: number) =>
  Math.min(Math.max(Math.trunc(quantity), 1), MAX_QUANTITY);

export function addItem(
  items: readonly CartItem[],
  productId: string,
  quantity: number,
) {
  const existing = items.find((item) => item.productId === productId);
  if (!existing) return [...items, { productId, quantity: clamp(quantity) }];
  return items.map((item) =>
    item === existing
      ? { productId, quantity: clamp(item.quantity + quantity) }
      : item,
  );
}

export function setItemQuantity(
  items: readonly CartItem[],
  productId: string,
  quantity: number,
) {
  return items.map((item) =>
    item.productId === productId
      ? { productId, quantity: clamp(quantity) }
      : item,
  );
}

export function removeItems(
  items: readonly CartItem[],
  productIds: readonly string[],
) {
  return items.filter((item) => !productIds.includes(item.productId));
}

type LiveProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string | null;
  isAvailable: boolean;
};

export type CartLine = LiveProduct & { quantity: number; subtotal: number };

// Display-only join of the stored ids with live database rows. The server
// recomputes the real total at checkout.
export function joinCart(
  items: readonly CartItem[],
  products: readonly LiveProduct[],
) {
  const byId = new Map(products.map((product) => [product.id, product]));
  const lines: CartLine[] = [];
  const missingIds: string[] = [];
  for (const { productId, quantity } of items) {
    const product = byId.get(productId);
    if (!product) {
      missingIds.push(productId);
      continue;
    }
    lines.push({ ...product, quantity, subtotal: product.price * quantity });
  }
  return {
    lines,
    missingIds,
    itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
    total: lines.reduce(
      (sum, line) => sum + (line.isAvailable ? line.subtotal : 0),
      0,
    ),
    hasUnavailable: lines.some((line) => !line.isAvailable),
  };
}
