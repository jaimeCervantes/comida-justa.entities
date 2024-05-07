import {
  MIN_LENGTH_TITLE,
  MIN_LENGTH_SUMMARY,
  MIN_LENGTH_CONTENT,
  imgRegex,
} from "./const/index.js";

export function validate(food) {
  validateStringOnFood(food.title, "title", MIN_LENGTH_TITLE);
  validateStringOnFood(food.summary, "summary", MIN_LENGTH_SUMMARY);
  validateStringOnFood(food.content, "content", MIN_LENGTH_CONTENT);
  validateNumberOnFood(food.price, "price");
  validateImages(food.images);
}

function validateStringOnFood(value, name, minLength) {
  if (!value) {
    throw new StringOnFoodError(value, `Missing ${name} prop on food entity.`);
  }

  if (typeof value !== "string") {
    throw new StringOnFoodError(
      value,
      `The ${name} property should be of type string.`
    );
  }

  if (value.length < minLength) {
    throw new StringOnFoodError(
      value,
      `The length of the ${name} should not be less than ${minLength}.`
    );
  }
}

function validateNumberOnFood(value, name) {
  if (typeof value !== "number") {
    throw new Error(`${name} must be a number.`);
  }
}

export function validateImages(images) {
  if (Array.isArray(images)) {
    for (const img of images) {
      validateSingleImage(img);
    }
  } else {
    throw new ImageOnFoodError(
      images,
      "At least one image is required for the food."
    );
  }
}

function validateSingleImage(image) {
  if (typeof image !== "string") {
    throw new ImageOnFoodError(image, "Each image url must be a string.");
  }

  if (!imgRegex.test(image)) {
    throw new ImageOnFoodError(
      image,
      `Image url (${image}) does not complience with our url images requirements.`
    );
  }
}

class ImageOnFoodError extends Error {
  constructor(value, message) {
    super(message);
    this.name = "ImageOnFoodEntityError";
    this.image = value;
    this.message = message;
  }
}

class StringOnFoodError extends Error {
  constructor(value, message) {
    super(message);
    this.value = value;
    (this.name = "StringOnFoodEntityError"), (this.message = message);
  }
}
