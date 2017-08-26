import React, { Component } from "react";
import PostForm from "../PostForm";
import FloatingButton from "../FloatingButton";
import uuidv1 from "uuid/v1";
import { connect } from "react-redux";
import { createPost } from "../../actions/posts";

class NewPostPage extends Component {
  handleSubmit({ body, author, category, title }) {
    this.props.dispatch(
      createPost({
        body,
        author,
        category,
        title,
        timestamp: Date.now(),
        voteScore: 1,
        id: uuidv1(),
        deleted: false
      })
    );
    this.props.history.push("/");
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

export default connect(state => state)(NewPostPage);
