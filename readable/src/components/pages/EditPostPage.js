import React, { Component } from "react";
import PostForm from "../PostForm";
import FloatingButton from "../FloatingButton";
import { connect } from "react-redux";
import { createPost, deletePost } from "../../actions/posts";
import { withRouter } from "react-router-dom";

class EditPostPage extends Component {
  handleEdit(post) {
    const { history, updatePost } = this.props;
    updatePost(post);
    history.push("/");
  }

  render() {
    const { post } = this.props;

    return (
      <div>
        <PostForm
          headerText="Edit Post"
          initialData={post}
          onSubmit={values => this.handleEdit(values)}
          cancelLink={`/${post.category}/${post.id}`}
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
    updatePost: post => {
      dispatch(deletePost(post));
      dispatch(createPost(post));
    }
  };
}

export default withRouter(connect(null, mapDispatchToProps)(EditPostPage));
