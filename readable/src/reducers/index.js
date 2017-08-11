import { UPVOTE, DOWNVOTE, CREATE_POST, CREATE_CATEGORY } from "../actions";

const inititalState = {
  posts: [],
  categories: []
};

const vote = (posts, post, vote) => {
  return posts.map(p => {
    if (p.id === post.id) {
      return {
        ...p,
        voteScore: p.voteScore + vote
      };
    }
    return p;
  });
};

function posts(state = inititalState, action) {
  const { post } = action;

  switch (action.type) {
    case UPVOTE:
      return {
        ...state,
        posts: vote(state.posts, post, 1)
      };
    case DOWNVOTE:
      return {
        ...state,
        posts: vote(state.posts, post, -1)
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, post]
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.category]
      };
    default:
      return state;
  }
}

export default posts;
