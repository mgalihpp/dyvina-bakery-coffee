import type { OrderStatus } from "@/generated/prisma/client";

export const ORDER_STATUSES = [
  "PENDING",
  "PROCESSING",
  "COMPLETED",
  "CANCELLED",
] as const satisfies readonly OrderStatus[];

export const ORDER_TRANSITIONS: Record<OrderStatus, readonly OrderStatus[]> = {
  PENDING: ["PROCESSING", "CANCELLED"],
  PROCESSING: ["COMPLETED", "CANCELLED"],
  COMPLETED: [],
  CANCELLED: [],
};

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: "Baru",
  PROCESSING: "Diproses",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
};

const ACTION_LABEL: Record<OrderStatus, string> = {
  PENDING: "Kembalikan ke Baru",
  PROCESSING: "Proses Pesanan",
  COMPLETED: "Selesaikan Pesanan",
  CANCELLED: "Batalkan Pesanan",
};

export function canTransition(from: OrderStatus, to: OrderStatus) {
  return ORDER_TRANSITIONS[from].includes(to);
}

export type OrderAction = {
  to: OrderStatus;
  label: string;
  tone: "primary" | "danger";
};

export function orderActions(status: OrderStatus): OrderAction[] {
  return ORDER_TRANSITIONS[status].map((to) => ({
    to,
    label: ACTION_LABEL[to],
    tone: to === "CANCELLED" ? "danger" : "primary",
  }));
}
