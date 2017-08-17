import React, { Component } from "react";
import "../styles/Comments.css"
import { connect } from "react-redux";
import { getFormattedDate } from "../helpers";

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
            <p className="comment-body">{comment.body}</p>
            <div className="comment-info">
              <span>{comment.author}</span>
              <span>{getFormattedDate(comment.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default connect(state => state)(Comments);