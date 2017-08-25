import React, { Component } from "react";
import Posts from "./Posts";
import Header from "./Header";
import PostForm from "./PostForm";
import CommentForm from "./CommentForm";
import FloatingButton from "./FloatingButton";
import Post from "./Post";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { initializePosts, createPost, deletePost } from "../actions/posts";
import { initializeCategories } from "../actions/categories";
import uuidv1 from "uuid/v1";

class App extends Component {
  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(initializeCategories());
    dispatch(initializePosts());
  }

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

  handleEdit(post) {
    const { dispatch, history } = this.props;
    dispatch(deletePost(post));
    dispatch(createPost(post));
    history.push("/");
  }

  render() {
    const { posts, history, comments } = this.props;

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/new"
            render={() =>
              <div>
                <PostForm
                  headerText="Create New Post"
                  onSubmit={values => this.handleSubmit(values)}
                  cancelLink="/"
                />
                <FloatingButton path="/" character="&#129120;" />
              </div>}
          />
          {posts.map(post =>
            <Route
              exact
              path={`/${post.category}/${post.id}/edit`}
              key={post.id}
              render={() =>
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
                </div>}
            />
          )}
          {comments.map(comment => 
            <Route
              exact
              path={`/comment/${comment.id}/edit`}
              key={comment.id}
              render={() => <CommentForm/>}
            />
          )}
          {posts.map(post =>
            <Route
              exact
              path={`/${post.category}/${post.id}`}
              key={post.id}
              render={() =>
                <div>
                  <Header />
                  <Post history={history} post={post} />
                  <FloatingButton path="/" character="&#129120;" />
                </div>}
            />
          )}
          <Route
            render={() =>
              <div>
                <Header />
                <Posts />
                <FloatingButton path="/new" character="+" />
              </div>}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(state => state)(App));
