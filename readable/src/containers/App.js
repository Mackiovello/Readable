import React, { Component } from "react";
import Posts from "../components/Posts";
import Header from "../components/Header";
import FloatingButton from "../components/FloatingButton";
import Post from "./Post";
import NewPostPage from "../components/pages/NewPostPage";
import EditPostPage from "../components/pages/EditPostPage";
import NewCommentPage from "../components/pages/NewCommentPage";
import EditCommentPage from "../components/pages/EditCommentPage";
import NotFound from "../components/NotFound";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { initializePosts } from "../actions/posts";
import { initializeCategories } from "../actions/categories";

class App extends Component {
  componentWillMount() {
    this.props.initialize();
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
              render={() =>
                post.deleted
                  ? <div>
                      <Header />
                      <NotFound />
                      <FloatingButton path="/" character="&#129120;" />
                    </div>
                  : <EditPostPage post={post} />}
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
                  {post.deleted
                    ? <NotFound />
                    : <Post history={history} post={post} />}
                  <FloatingButton path="/" character="&#129120;" />
                </div>}
            />
          )}
          {posts.map(post =>
            <Route
              exact
              path={`/${post.category}/${post.id}/comment`}
              key={post.id}
              render={() =>
                post.deleted
                  ? <div>
                      <Header />
                      <NotFound />
                      <FloatingButton path="/" character="&#129120;" />
                    </div>
                  : <NewCommentPage post={post} />}
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

function mapStateToProps({ posts, comments }) {
  return { posts, comments };
}

function mapDispatchToProps(dispatch) {
  return {
    initialize: () => {
      dispatch(initializeCategories());
      dispatch(initializePosts());
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
