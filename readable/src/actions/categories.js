import { getCategories } from "../api";
import { CREATE_CATEGORY } from "./types";

export function initializeCategories() {
  return dispatch =>
    getCategories().then(categories =>
      categories.forEach(category => dispatch(createCategory(category), this))
    );
}

export function createCategory(category) {
  return {
    type: CREATE_CATEGORY,
    category
  };
}
