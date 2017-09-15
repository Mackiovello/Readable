import React, { Component } from "react";
import PostForm from "../PostForm";
import FloatingButton from "../FloatingButton";
import uuidv1 from "uuid/v1";
import { connect } from "react-redux";
import { createPost as createPostAction } from "../../actions/posts";

class NewPostPage extends Component {
  handleSubmit({ body, author, category, title }) {
    const { createPost, history } = this.props;
    createPost({
      body,
      author,
      category,
      title,
      timestamp: Date.now(),
      voteScore: 1,
      id: uuidv1(),
      deleted: false
    });
    history.push("/");
  }

  render() {
    return (
      <div>
        <PostForm
          headerText="Create New Post"
          onSubmit={values => this.handleSubmit(values)}
          cancelLink="/"
        />
        <FloatingButton path="/" character="&#129120;" />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createPost: post => dispatch(createPostAction(post))
  };
}

export default connect(null, mapDispatchToProps)(NewPostPage);
