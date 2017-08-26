import React, { Component } from "react";
import CommentForm from "../CommentForm";
import FloatingButton from "../FloatingButton";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import uuidv1 from "uuid/v1";
import { createComment } from "../../actions/comments";

class NewCommentPage extends Component {
  addComment(parentPost) {
    const { body, author } = this.props.form.commentForm.values;
    this.props.dispatch(
      createComment({
        body,
        author,
        timestamp: Date.now(),
        voteScore: 1,
        id: uuidv1(),
        parentId: parentPost.id,
        parentDeleted: false,
        deleted: false
      })
    );
    this.props.history.push(`/${parentPost.category}/${parentPost.id}`);
  }

  render() {
    const { post } = this.props;

    return (
      <div>
        <CommentForm
          headerText="Comment"
          cancelLink={`/${post.category}/${post.id}`}
          parentId={post.id}
          handleComment={() => this.addComment(post)}
        />
        <FloatingButton
          path={`/${post.category}/${post.id}`}
          character="&#129120;"
        />
      </div>
    );
  }
}

export default withRouter(connect(state => state)(NewCommentPage));
