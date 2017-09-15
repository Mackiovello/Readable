import React, { Component } from "react";
import CommentForm from "../CommentForm";
import FloatingButton from "../FloatingButton";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import uuidv1 from "uuid/v1";
import { createComment as createCommentAction } from "../../actions/comments";

class NewCommentPage extends Component {
  addComment({ body, author }, parentPost) {
    const comment = {
      body,
      author,
      timestamp: Date.now(),
      voteScore: 1,
      id: uuidv1(),
      parentId: parentPost.id,
      parentDeleted: false,
      deleted: false
    };
    this.props.createComment(comment);
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
          onSubmit={values => this.addComment(values, post)}
        />
        <FloatingButton
          path={`/${post.category}/${post.id}`}
          character="&#129120;"
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createComment: comment => dispatch(createCommentAction(comment))
  };
}

export default withRouter(connect(null, mapDispatchToProps)(NewCommentPage));
