import { describe, expect, it } from "vitest";
import { formatOrderDateTime, formatOrderTime, formatPhone } from "./format";

describe("formatOrderTime", () => {
  const now = new Date("2026-06-01T05:00:00Z");

  it("shows the clock for orders placed today in Jakarta", () => {
    expect(formatOrderTime(new Date("2026-06-01T03:24:00Z"), now)).toBe(
      "10:24",
    );
  });

  it("uses the Jakarta day boundary, not UTC", () => {
    expect(formatOrderTime(new Date("2026-05-31T17:30:00Z"), now)).toBe(
      "00:30",
    );
    expect(formatOrderTime(new Date("2026-05-31T16:30:00Z"), now)).toBe(
      "Kemarin",
    );
  });

  it("falls back to day and month for older orders", () => {
    expect(formatOrderTime(new Date("2026-05-30T03:00:00Z"), now)).toBe(
      "30 Mei",
    );
  });
});

describe("formatOrderDateTime", () => {
  it("joins day, month, and clock", () => {
    expect(formatOrderDateTime(new Date("2026-06-01T03:24:00Z"))).toBe(
      "1 Jun, 10:24",
    );
  });
});

describe("formatPhone", () => {
  it("shows a stored 62 number in local grouped form", () => {
    expect(formatPhone("6281234567890")).toBe("0812-3456-7890");
  });
});
