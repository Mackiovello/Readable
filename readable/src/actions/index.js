export const UPVOTE = "UPVOTE";
export const DOWNVOTE = "DOWNVOTE";
export const CREATE_POST = "CREATE_POST";
export const CREATE_CATEGORY = "CREATE_CATEGORY";

export function upvote(post) {
  return {
    type: UPVOTE,
    post
  };
}

export function downvote(post) {
  return {
    type: DOWNVOTE,
    post
  };
}

export function createCategory(category) {
  return {
    type: CREATE_CATEGORY,
    category
  };
}

export function createPost({
  author,
  body,
  category,
  deleted,
  id,
  timestamp,
  title,
  voteScore
}) {
  return {
    type: CREATE_POST,
    post: {
      author,
      body,
      category,
      deleted,
      id,
      timestamp,
      title,
      voteScore
    }
  };
}
