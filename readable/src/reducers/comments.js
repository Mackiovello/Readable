import { ADD_COMMENT } from "../actions/comments";

function comments(comments = [], action) {
  const { comment } = action;

  switch(action.type) {
    case ADD_COMMENT:
      return [...comments, comment];
    default:
      return comments;
  }
}

export default comments;