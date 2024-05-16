import { test, describe, expect } from "vitest";
import { validate } from "./validate.ts";
import {
  ingredientsToValidate as dummyIngredientsToValidate,
  ingredientsNotValidate as dummyIngredientsNotValidate,
  ingredientsToValidate,
} from "./dummies/ingredients.ts";
import { MIN_LENGTH_TITLE } from "./const/index.ts";

describe("When Validating food", () => {
  test("Then correct food details should NOT throws an error", () => {
    expect(() => {
      validate(ingredientsToValidate);
    }).not.toThrowError();
  });

  test("Then missing title should throw an StringOnFoodEntityError", () => {
    expect(() => {
      // @ts-ignore
      validate({ title: "" });
    }).toThrowError(`Missing title prop on food entity.`);
  });

  test("Then invalid title should throw a StringOnFoodEntityError", () => {
    expect(() => {
      // @ts-ignore
      validate({ title: {} });
    }).toThrowError(/title property should be of type string/);
  });

  test("Then invalid title should throw a StringOnFoodEntityError", () => {
    expect(() => {
      // @ts-ignore
      validate({ title: "many" });
    }).toThrowError(`title should not be less than ${MIN_LENGTH_TITLE}.`);
  });

  test("Then missing summary should throw an StringOnFoodEntityError", () => {
    expect(() => {
      // @ts-ignore
      validate({ title: "Crema de cacahuate title" });
    }).toThrowError("Missing summary prop on food entity.");
  });

  test("Then missing content should throw an StringOnFoodEntityError", () => {
    expect(() => {
      // @ts-ignore
      validate({
        title: "Crema de cacahuate title",
        summary: "Crema de cacahuate summary",
      });
    }).toThrowError("Missing content prop on food entity.");
  });

  test("Then invalid price should throw an Error", () => {
    expect(() => {
      // @ts-ignore
      validate({
        title: "Crema de cacahuate title",
        summary: "Crema de cacahuate summary",
        content: "Crema de cacahuate contenido",
      });
    }).toThrowError("price must be a number.");
  });

  test("Then invalid images should throw an ImageError", () => {
    expect(() => {
      // @ts-ignore
      validate({
        title: "Crema de cacahuate title",
        summary: "Crema de cacahuate summary",
        content: "Crema de cacahuate contenido",
        price: 50,
      });
    }).toThrowError("At least one image is required for the food.");
  });

  test("Then invalid image, no string, should throw an ImageError", () => {
    expect(() => {
      validate({
        title: "Crema de cacahuate title",
        summary: "Crema de cacahuate summary",
        content: "Crema de cacahuate contenido",
        price: 50,
        // @ts-ignore
        images: [1, 2, 3, 4],
      });
    }).toThrowError("Each image url must be a string.");
  });

  test("Then invalid image url should throw an ImageOnFoodEntityError with a messages containing the invalid image", () => {
    expect(() => {
      validate({
        title: "Crema de cacahuate title",
        summary: "Crema de cacahuate summary",
        content: "Crema de cacahuate contenido",
        price: 50,
        images: ["http://image/sin/protocolo/seguro/imagen.png"],
      });
    }).toThrowError(
      `Image url (http://image/sin/protocolo/seguro/imagen.png) does not complience with our url images requirements.`
    );
  });
});
