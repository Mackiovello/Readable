import { voteComment } from "../api";

export const ADD_COMMENT = "ADD_COMMENT";
export const UPVOTE_COMMENT = "UPVOTE_COMMENT";
export const DOWNVOTE_COMMENT = "DOWNVOTE_COMMENT";

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  };
}

export function upvoteComment(comment) {
  return dispatch => vote(comment, "upVote", dispatch);
}

export function downvoteComment(comment) {
  return dispatch => vote(comment, "downVote", dispatch);
}

const vote = (comment, option, dispatch) => {
  return voteComment(comment.id, option).then(() => {
    if (option === "upVote" || option === "downVote") {
      dispatch({
        type: option === "upVote" ? UPVOTE_COMMENT : DOWNVOTE_COMMENT,
        comment
      });
    } else {
      throw new Error("option must be 'upVote' or 'downVote'");
    }
  });
};