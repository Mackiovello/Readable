import { voteComment, deleteCommentFromDb, createCommentInDb } from "../api";
import { CREATE_COMMENT, UPVOTE_COMMENT, DOWNVOTE_COMMENT, DELETE_COMMENT } from "./types";

export function addComment(comment) {
  return {
    type: CREATE_COMMENT,
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

export function deleteComment(comment) {
  return dispatch => {
    return deleteCommentFromDb(comment.id).then(
      dispatch({
        type: DELETE_COMMENT,
        comment
      })
    );
  };
}

export function createComment(comment) {
  return dispatch => {
    return createCommentInDb(comment).then(dispatch(addComment(comment)));
  };
}
