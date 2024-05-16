import { test, describe, expect } from "vitest";
import { generateSlug } from "./generateSlug.ts";

describe("Generate Slug base of the title of the healthy food", () => {
  const title =
    "Crema de cacahuate natural sin sal, sin azúcar y sin conservadores";
  const upperCasedTitle = title.toLocaleUpperCase();

  test("Should remove any diacritic character from the title.", () => {
    const result = generateSlug(title);
    expect(result).toBe(
      "crema-de-cacahuate-natural-sin-sal-sin-azucar-y-sin-conservadores"
    );
  });

  test("Should remove any special characters from the title.", () => {
    const result = generateSlug(`@#$%^&*() ${title} @#$%^&*()`);
    expect(result).toBe(
      "crema-de-cacahuate-natural-sin-sal-sin-azucar-y-sin-conservadores"
    );
  });

  test("Should keep any numbers from the title.", () => {
    const result = generateSlug(`12345 ${title} 12345`);
    expect(result).toBe(
      "12345-crema-de-cacahuate-natural-sin-sal-sin-azucar-y-sin-conservadores-12345"
    );
  });

  test("Should return an empty string if the title consists of just whitespace.", () => {
    const result = generateSlug("\t   ");
    expect(result).toBe("");
  });

  test("Should return a slug for a valid title.", () => {
    const result = generateSlug(title);
    expect(result).toBe(
      "crema-de-cacahuate-natural-sin-sal-sin-azucar-y-sin-conservadores"
    );
  });

  test("Should return an empty string if there is no title provided.", () => {
    const result = generateSlug("");
    expect(result).toBe("");
  });

  test("Should convert all text to lowercase before creating the slug.", () => {
    const result = generateSlug(upperCasedTitle);
    expect(result).toBe(
      "crema-de-cacahuate-natural-sin-sal-sin-azucar-y-sin-conservadores"
    );
  });
});
