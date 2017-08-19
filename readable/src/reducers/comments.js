import { ADD_COMMENT, UPVOTE_COMMENT, DOWNVOTE_COMMENT } from "../actions/comments";

const vote = (comments, comment, vote) => {
  return comments.map(c => {
    if (c.id === comment.id) {
      return {
        ...c,
        voteScore: c.voteScore + vote
      };
    }
    return c;
  });
};


function comments(comments = [], action) {
  const { comment } = action;

  switch (action.type) {
    case ADD_COMMENT:
      return [...comments, comment];
    case UPVOTE_COMMENT:
      return vote(comments, comment, 1);
    case DOWNVOTE_COMMENT:
      return vote(comments, comment, -1);
    default:
      return comments;
  }
}

export default comments;