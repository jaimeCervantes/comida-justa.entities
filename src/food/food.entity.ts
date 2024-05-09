import type { Food, FoodEntityCreatorDeps, FoodEntity } from "./types/index.ts";

export class FoodEntityCreator {
  validate: (ingredients: Food) => void | never;
  generateSlug: (title: string) => string;

  constructor({ validate, generateSlug }: FoodEntityCreatorDeps) {
    this.validate = validate;
    this.generateSlug = generateSlug;
  }

  makeFood(ingredients: Food): FoodEntity {
    const validate = this.validate;
    const generateSlug = this.generateSlug;
    let food: Food = ingredients;

    this.validate(ingredients);

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
  }
}
