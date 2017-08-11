import { UPVOTE, DOWNVOTE, CREATE_POST } from "../actions";

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

function posts(state = [], action) {
  const { post } = action;

  switch (action.type) {
    case UPVOTE:
      return vote(state, post, 1);
    case DOWNVOTE:
      return vote(state, post, -1);
    case CREATE_POST:
      return [...state, post];
    default:
      return state;
  }
}

export default posts;
