import {
  CREATE_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  DELETE_COMMENT
} from "../actions/comments";

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
    case CREATE_COMMENT:
      return [...comments, comment];
    case UPVOTE_COMMENT:
      return vote(comments, comment, 1);
    case DOWNVOTE_COMMENT:
      return vote(comments, comment, -1);
    case DELETE_COMMENT:
      return comments.filter(c => c.id !== comment.id);
    default:
      return comments;
  }
}

export default comments;
