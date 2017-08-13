export const CREATE_CATEGORY = "CREATE_CATEGORY";

export function createCategory(category) {
  return {
    type: CREATE_CATEGORY,
    category
  };
}
