import { test, describe, beforeEach, expect } from "vitest";

import assert from "node:assert/strict";
import { validate, generateSlug, FoodEntityCreator } from "./index.ts";
import { ingredients as dummyIngredients } from "./dummies/ingredients.ts";
import type { Food, FoodEntity } from "./types/index.ts";

describe(`When user needs to create a food entity with its local dependencies
and provide correct data`, () => {
  let foodCreator: FoodEntityCreator;
  let ingredients: Food;
  beforeEach(() => {
    ingredients = dummyIngredients;
    foodCreator = new FoodEntityCreator({ validate, generateSlug });
  });

  test("Then createFoodEntity should retun a createFood function", () => {
    const foodCreator = new FoodEntityCreator({ validate, generateSlug });

    expect(typeof foodCreator.makeFood).toBe("function");
  });

  test("Then createFoodEntity should generate a slug using local generateSlug dependency", () => {
    const food: FoodEntity = foodCreator.makeFood(ingredients);

    expect(food.getSlug()).toBe(
      "crema-de-cacahuate-natural-sin-sal-sin-azucar-y-sin-conservadores"
    );
  });

  test("Then createFoodEntity should generate all details needed for a healthy food", () => {
    const foodCreator = new FoodEntityCreator({ validate, generateSlug });
    const food: FoodEntity = foodCreator.makeFood(ingredients);

    expect(food.getDetails()).toEqual({
      ...ingredients,
      slug: food.getSlug(),
    });
  });

  test("Then invoking genereSlug method should generate a slug ", () => {
    const foodCreator = new FoodEntityCreator({ validate, generateSlug });
    const food: FoodEntity = foodCreator.makeFood(ingredients);
    const slug = food.generateSlug(ingredients.title);

    expect(slug).toBe(
      "crema-de-cacahuate-natural-sin-sal-sin-azucar-y-sin-conservadores"
    );
  });

  test("Then invoking setSlug method should set new slug ", () => {
    const foodCreator = new FoodEntityCreator({ validate, generateSlug });
    const food: FoodEntity = foodCreator.makeFood(ingredients);
    const newSlug = "crema-de-avellanas";
    food.setSlug(newSlug);

    expect(food.getSlug()).toBe(newSlug);
  });
});
