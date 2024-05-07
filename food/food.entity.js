export function createFoodEntity({ validate, generateSlug }) {
  return function makeFood(inputData) {
    let food;
    validate(inputData);

    if (!inputData.slug) {
      const slug = generateSlug(inputData.title);
      food = { ...inputData, slug };
    }

    return Object.freeze({
      getDetails() {
        return food;
      },
      generateSlug(title) {
        return generateSlug(title);
      },
      validate: validate,
      setSlug(slug) {
        food.slug = slug;
      },
      getSlug() {
        return food.slug;
      },
    });
  };
}
