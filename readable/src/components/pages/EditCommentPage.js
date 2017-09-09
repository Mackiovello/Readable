import React, { Component } from "react";
import CommentForm from "../CommentForm";
import FloatingButton from "../FloatingButton";
import { connect } from "react-redux";
import { createComment, deleteComment } from "../../actions/comments";
import { withRouter } from "react-router-dom";

class EditCommentPage extends Component {
  handleEdit(comment, parentLink) {
    const { history, updateComment } = this.props;
    updateComment(comment);
    history.push(parentLink);
  }

  render() {
    const { comment } = this.props;
    const parent = this.props.posts.filter(post => post.id === comment.parentId)[0];
    const parentLink = `/${parent.category}/${parent.id}`;

    return (
      <div>
        <CommentForm
          headerText="Edit Comment"
          initialData={comment}
          onSubmit={values => this.handleEdit(values, parentLink)}
          cancelLink={parentLink}
        />
        <FloatingButton
          path={parentLink}
          character="&#129120;"
        />
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return { posts };
}

function mapDispatchToProps(dispatch) {
  return {
    updateComment: comment => {
      dispatch(deleteComment(comment));
      dispatch(createComment(comment));
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps
)(EditCommentPage));
