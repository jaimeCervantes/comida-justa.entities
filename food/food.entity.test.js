import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { createFoodEntity, validate, generateSlug } from "./index.js";
import { ingredients as dummyIngredients } from "./dummies/ingredients.js";

describe(`When user needs to create a food entity with its local dependencies
and provide correct data`, () => {
  let makeFood = null;
  let ingredients = null;
  beforeEach(() => {
    ingredients = dummyIngredients;
    makeFood = createFoodEntity({ validate, generateSlug });
  });

  test("Then createFoodEntity should retun a createFood function", () => {
    const makeFood = createFoodEntity({ validate, generateSlug });

    assert.equal(typeof makeFood, "function");
  });

  test("Then createFoodEntity should generate a slug using local generateSlug dependency", () => {
    const food = makeFood(ingredients);

    assert.equal(
      food.getSlug(),
      "crema-de-cacahuate-natural-sin-sal-sin-azucar-y-sin-conservadores"
    );
  });

  test("Then createFoodEntity should generate all details needed for a healthy food", () => {
    const makeFood = createFoodEntity({ validate, generateSlug });
    const food = makeFood(ingredients);

    assert.deepEqual(food.getDetails(), {
      ...ingredients,
      slug: food.getSlug(),
    });
  });

  test("Then invoking genereSlug method should generate a slug ", () => {
    const makeFood = createFoodEntity({ validate, generateSlug });
    const food = makeFood(ingredients);
    const slug = food.generateSlug(ingredients.title);

    assert.equal(
      slug,
      "crema-de-cacahuate-natural-sin-sal-sin-azucar-y-sin-conservadores"
    );
  });

  test("Then invoking setSlug method should set new slug ", () => {
    const makeFood = createFoodEntity({ validate, generateSlug });
    const food = makeFood(ingredients);
    const newSlug = "crema-de-avellanas";
    food.setSlug(newSlug);

    assert.equal(food.getSlug(), newSlug);
  });
});
