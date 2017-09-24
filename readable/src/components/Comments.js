import React from "react";
import { connect } from "react-redux";
import { getFormattedDate } from "../helpers";
import Votes from "./Votes";
import {
  deleteComment as deleteCommentAction,
  upvoteComment,
  downvoteComment
} from "../actions/comments";
import Actions from "./Actions";
import { Comment, CommentWrapper, CommentInfo } from "./StyledComponents";

function Comments({ comments, parentId, deleteComment }) {
  const filteredComments = parentId
    ? comments.filter(comment => comment.parentId === parentId)
    : comments;

  return (
    <div>
      {filteredComments.map(comment =>
        <Comment key={comment.id}>
          <CommentWrapper>
            <p style={{ margin: "0 0 15px 0" }}>
              {comment.body}
            </p>
            <CommentInfo>
              <span>
                {comment.author}
              </span>
              <span>
                {getFormattedDate(comment.timestamp)}
              </span>
            </CommentInfo>
          </CommentWrapper>
          <Actions
            editLink={`/comment/${comment.id}/edit`}
            onDelete={() => deleteComment(comment)}
          />
          <Votes
            toVoteOn={comment}
            upvote={upvoteComment}
            downvote={downvoteComment}
          />
        </Comment>
      )}
    </div>
  );
}

export default connect(
  ({ comments }) => ({ comments }),
  dispatch => {
    return {
      deleteComment: comment => dispatch(deleteCommentAction(comment))
    };
  }
)(Comments);
