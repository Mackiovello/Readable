import React, { Component } from "react";
import Posts from "./Posts";
import Header from "./Header";
import FloatingButton from "./FloatingButton";
import Post from "./Post";
import NewPostPage from "./pages/NewPostPage";
import EditPostPage from "./pages/EditPostPage";
import NewCommentPage from "./pages/NewCommentPage";
import EditCommentPage from "./pages/EditCommentPage";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { initializePosts } from "../actions/posts";
import { initializeCategories } from "../actions/categories";

class App extends Component {
  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(initializeCategories());
    dispatch(initializePosts());
  }

  render() {
    const { posts, history, comments } = this.props;

    return (
      <div>
        <Switch>
          <Route exact path="/new" component={NewPostPage} />
          {posts.map(post =>
            <Route
              exact
              path={`/${post.category}/${post.id}/edit`}
              key={post.id}
              render={() => <EditPostPage post={post} />}
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
          {posts.map(post =>
            <Route
              exact
              path={`/${post.category}/${post.id}/comment`}
              key={post.id}
              render={() => <NewCommentPage post={post} />}
            />
          )}
          {comments.map(comment =>
            <Route
              exact
              path={`/comment/${comment.id}/edit`}
              key={comment.id}
              render={() => <EditCommentPage comment={comment} />}
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
