import { CREATE_CATEGORY } from "../actions/categories";

function categories(state = [], action) {
  switch (action.type) {
    case CREATE_CATEGORY:
      return [...state, action.category];
    default:
      return state;
  }
}

export default categories;
