import { getCategories } from "../api";

export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const CREATE_CATEGORIES = "CREATE_CATEGORIES";

export function initializeCategories() {
  return dispatch => getCategories().then(categories =>
    categories.forEach(category => dispatch(createCategory(category), this))
  )
}

export function createCategory(category) {
  return {
    type: CREATE_CATEGORY,
    category
  };
}
