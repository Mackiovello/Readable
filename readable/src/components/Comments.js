import React, { Component } from "react";
import "../styles/Comments.css"
import { connect } from "react-redux";
import { getFormattedDate } from "../helpers";
import Votes from "./Votes";
import { upvoteComment, downvoteComment } from "../actions/comments";

class Comments extends Component {
  render() {
    const { comments, parentId } = this.props; 
    const filteredComments = parentId ? 
      comments.filter(comment => comment.parentId === parentId) :
      comments;

    return (
      <div>
        {filteredComments.map(comment => (
          <div className="comment" key={comment.id}>
            <div className="comment-wrapper">
              <p className="comment-body">{comment.body}</p>
              <div className="comment-info">
                <span>{comment.author}</span>
                <span>{getFormattedDate(comment.timestamp)}</span>
              </div>
            </div>
            <Votes
              toVoteOn={comment}
              upvote={upvoteComment}
              downvote={downvoteComment}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default connect(state => state)(Comments);