import type { Food, CreateFoodEntityDeps, FoodEntity } from "./types/index.ts";
export function createFoodEntity({
  validate,
  generateSlug,
}: CreateFoodEntityDeps) {
  return function makeFood(ingredients: Food): FoodEntity {
    validate(ingredients);

    let food: Food = ingredients;
    if (!ingredients.slug) {
      const slug: string = generateSlug(ingredients.title);
      food = { ...ingredients, slug };
    }

    return Object.freeze({
      validate: validate,
      generateSlug(title: string): string {
        return generateSlug(title);
      },
      setSlug(slug: string): void {
        food.slug = slug;
      },
      getSlug(): string | undefined {
        return food.slug;
      },
      getDetails(): Food {
        return { ...food };
      },
    });
  };
}
