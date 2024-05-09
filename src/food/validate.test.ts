import { test, describe } from "vitest";
import assert from "node:assert/strict";
import { validate } from "./validate.ts";
import {
  ingredientsToValidate as dummyIngredientsToValidate,
  ingredientsNotValidate as dummyIngredientsNotValidate,
  ingredientsToValidate,
} from "./dummies/ingredients.ts";
import { MIN_LENGTH_TITLE } from "./const/index.ts";

describe("When Validating food", () => {
  test("Then correct food details should NOT throws an error", () => {
    assert.doesNotThrow(() => {
      validate(ingredientsToValidate);
    });
  });

  test("Then missing title should throw an StringOnFoodEntityError", () => {
    assert.throws(
      () => {
        // @ts-ignore
        validate({ title: "" });
      },
      {
        name: "StringOnFoodEntityError",
        message: `Missing title prop on food entity.`,
      }
    );
  });

  test("Then invalid title should throw an StringOnFoodEntityError", () => {
    assert.throws(
      () => {
        // @ts-ignore
        validate({ title: {} });
      },
      {
        name: "StringOnFoodEntityError",
        message: /title property should be of type string/,
      }
    );
  });

  test("Then invalid title should throw an StringOnFoodEntityError", () => {
    assert.throws(
      () => {
        // @ts-ignore
        validate({ title: "many" });
      },
      {
        name: "StringOnFoodEntityError",
        message: `The length of the title should not be less than ${MIN_LENGTH_TITLE}.`,
      }
    );
  });

  test("Then missing summary should throw an StringOnFoodEntityError", () => {
    assert.throws(
      () => {
        // @ts-ignore
        validate({ title: "Crema de cacahuate title" });
      },
      {
        name: "StringOnFoodEntityError",
        message: `Missing summary prop on food entity.`,
      }
    );
  });

  test("Then missing content should throw an StringOnFoodEntityError", () => {
    assert.throws(
      () => {
        // @ts-ignore
        validate({
          title: "Crema de cacahuate title",
          summary: "Crema de cacahuate summary",
        });
      },
      {
        name: "StringOnFoodEntityError",
        message: `Missing content prop on food entity.`,
      }
    );
  });

  test("Then invalid price should throw an Error", () => {
    assert.throws(
      () => {
        // @ts-ignore
        validate({
          title: "Crema de cacahuate title",
          summary: "Crema de cacahuate summary",
          content: "Crema de cacahuate contenido",
        });
      },
      {
        name: "Error",
        message: "price must be a number.",
      }
    );
  });

  test("Then invalid images should throw an ImageError", () => {
    assert.throws(
      () => {
        // @ts-ignore
        validate({
          title: "Crema de cacahuate title",
          summary: "Crema de cacahuate summary",
          content: "Crema de cacahuate contenido",
          price: 50,
        });
      },
      {
        name: "ImageOnFoodEntityError",
        message: "At least one image is required for the food.",
      }
    );
  });

  test("Then invalid image, no string, should throw an ImageError", () => {
    assert.throws(
      () => {
        validate({
          title: "Crema de cacahuate title",
          summary: "Crema de cacahuate summary",
          content: "Crema de cacahuate contenido",
          price: 50,
          // @ts-ignore
          images: [1, 2, 3, 4],
        });
      },
      {
        name: "ImageOnFoodEntityError",
        message: "Each image url must be a string.",
      }
    );
  });

  test("Then invalid image url should throw an ImageOnFoodEntityError with a messages containing the invalid image", () => {
    assert.throws(
      () => {
        validate({
          title: "Crema de cacahuate title",
          summary: "Crema de cacahuate summary",
          content: "Crema de cacahuate contenido",
          price: 50,
          images: ["http://image/sin/protocolo/seguro/imagen.png"],
        });
      },
      {
        name: "ImageOnFoodEntityError",
        message: `Image url (http://image/sin/protocolo/seguro/imagen.png) does not complience with our url images requirements.`,
      }
    );
  });
});
