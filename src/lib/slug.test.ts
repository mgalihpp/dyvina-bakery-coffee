import { describe, expect, it } from "vitest";
import { SLUG_MAX, SLUG_PATTERN, slugify } from "./slug";

describe("slugify", () => {
  it("lowercases and joins words with single hyphens", () => {
    expect(slugify("Roti Pisang  Cokelat & Keju")).toBe(
      "roti-pisang-cokelat-keju",
    );
  });

  it("strips diacritics", () => {
    expect(slugify("Crème Brûlée Café")).toBe("creme-brulee-cafe");
  });

  it("trims leading and trailing separators", () => {
    expect(slugify("  --Non-Coffee!!  ")).toBe("non-coffee");
  });

  it("returns an empty string when nothing usable remains", () => {
    expect(slugify("!!!")).toBe("");
  });

  it("caps the length without leaving a trailing hyphen", () => {
    const slug = slugify(`${"a".repeat(SLUG_MAX - 1)} bcd`);
    expect(slug.length).toBeLessThanOrEqual(SLUG_MAX);
    expect(slug).toMatch(SLUG_PATTERN);
  });

  it("always produces a slug the form schema accepts", () => {
    for (const name of ["Ice Caramel Latte", "Bolu 3 Rasa", "Kue_Lapis"]) {
      expect(slugify(name)).toMatch(SLUG_PATTERN);
    }
  });
});
