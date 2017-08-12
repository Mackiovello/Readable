import { UPVOTE, DOWNVOTE, CREATE_POST, DELETE_POST } from "../actions/posts";

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

function posts(posts = [], action) {
  const { post } = action;

  switch (action.type) {
    case UPVOTE:
      return vote(posts, post, 1);
    case DOWNVOTE:
      return vote(posts, post, -1);
    case CREATE_POST:
      return [...posts, post];
    case DELETE_POST:
      return posts.filter(p => p.id !== post.id);
    default:
      return posts;
  }
}

export default posts;
