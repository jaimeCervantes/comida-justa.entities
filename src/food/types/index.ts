export type Food = {
  title: string;
  slug?: string;
  summary: string;
  content: string;
  price: number;
  images: string[];
};

export type FoodEntityCreatorDeps = {
  validate: (ingredients: Food) => void | never;
  generateSlug: (string: string) => string;
};

export type FoodEntity = Readonly<{
  validate: (ingredientes: Food) => void;
  generateSlug: (title: string) => string;
  getSlug: () => string | undefined;
  setSlug: (slug: string) => void;
  getDetails: () => Food;
}>;

export type VoidOrError = void | never;
