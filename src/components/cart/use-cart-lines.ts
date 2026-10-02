"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { joinCart } from "@/lib/cart";
import { useCart } from "@/lib/cart-store";
import { useHydrated } from "@/lib/use-hydrated";
import { useTRPC } from "@/trpc/client";

const EMPTY: ReturnType<typeof joinCart> = {
  lines: [],
  missingIds: [],
  itemCount: 0,
  total: 0,
  hasUnavailable: false,
};

export function useCartLines() {
  const trpc = useTRPC();
  const hydrated = useHydrated();
  const items = useCart((state) => state.items);
  const remove = useCart((state) => state.remove);

  const ids = items.map((item) => item.productId).sort();
  const query = useQuery({
    ...trpc.product.byIds.queryOptions({ ids }),
    enabled: hydrated && ids.length > 0,
    staleTime: 0,
    placeholderData: keepPreviousData,
  });

  const cart = query.data ? joinCart(items, query.data) : EMPTY;
  const { missingIds } = cart;
  useEffect(() => {
    if (missingIds.length > 0) remove(missingIds);
  }, [missingIds, remove]);

  const status = !hydrated
    ? "loading"
    : items.length === 0
      ? "empty"
      : query.isError
        ? "error"
        : query.data
          ? "ready"
          : "loading";

  return { ...cart, status, items, refetch: query.refetch } as const;
}
