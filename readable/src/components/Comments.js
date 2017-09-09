import React, { Component } from "react";
import "../styles/Comments.css";
import { connect } from "react-redux";
import { getFormattedDate } from "../helpers";
import Votes from "./Votes";
import { deleteComment as deleteCommentAction, upvoteComment, downvoteComment } from "../actions/comments";
import Actions from "./Actions";

class Comments extends Component {
  render() {
    const { comments, parentId, deleteComment } = this.props;
    const filteredComments = parentId
      ? comments.filter(comment => comment.parentId === parentId)
      : comments;

    return (
      <div>
        {filteredComments.map(comment =>
          <div className="comment" key={comment.id}>
            <div className="comment-wrapper">
              <p className="comment-body">
                {comment.body}
              </p>
              <div className="comment-info">
                <span>
                  {comment.author}
                </span>
                <span>
                  {getFormattedDate(comment.timestamp)}
                </span>
              </div>
            </div>
            <Actions 
              editLink={`/comment/${comment.id}/edit`}
              onDelete={() => deleteComment(comment)}
            />
            <Votes
              toVoteOn={comment}
              upvote={upvoteComment}
              downvote={downvoteComment}
            />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ comments }) {
  return { comments };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteComment: comment => dispatch(deleteCommentAction(comment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
