import { describe, expect, it } from "vitest";
import {
  canTransition,
  ORDER_STATUSES,
  ORDER_TRANSITIONS,
  orderActions,
} from "./order-status";

describe("canTransition", () => {
  it("moves a new order forward or cancels it", () => {
    expect(canTransition("PENDING", "PROCESSING")).toBe(true);
    expect(canTransition("PENDING", "CANCELLED")).toBe(true);
    expect(canTransition("PROCESSING", "COMPLETED")).toBe(true);
    expect(canTransition("PROCESSING", "CANCELLED")).toBe(true);
  });

  it("refuses to skip processing or move backwards", () => {
    expect(canTransition("PENDING", "COMPLETED")).toBe(false);
    expect(canTransition("PROCESSING", "PENDING")).toBe(false);
    expect(canTransition("PENDING", "PENDING")).toBe(false);
  });

  it("treats completed and cancelled as final", () => {
    for (const to of ORDER_STATUSES) {
      expect(canTransition("COMPLETED", to)).toBe(false);
      expect(canTransition("CANCELLED", to)).toBe(false);
    }
  });
});

describe("orderActions", () => {
  it("offers exactly the allowed transitions, primary first", () => {
    expect(orderActions("PENDING")).toEqual([
      { to: "PROCESSING", label: "Proses Pesanan", tone: "primary" },
      { to: "CANCELLED", label: "Batalkan Pesanan", tone: "danger" },
    ]);
    expect(orderActions("PROCESSING").map((action) => action.label)).toEqual([
      "Selesaikan Pesanan",
      "Batalkan Pesanan",
    ]);
  });

  it("offers nothing for final statuses", () => {
    expect(orderActions("COMPLETED")).toEqual([]);
    expect(orderActions("CANCELLED")).toEqual([]);
  });

  it("matches the transition table for every status", () => {
    for (const status of ORDER_STATUSES) {
      expect(orderActions(status).map((action) => action.to)).toEqual(
        ORDER_TRANSITIONS[status],
      );
    }
  });
});
