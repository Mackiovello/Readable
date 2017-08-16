import React, { Component } from "react";
import Posts from "./Posts";
import Header from "./Header";
import PostForm from "./PostForm";
import FloatingButton from "./FloatingButton";
import Post from "./Post";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { initializePosts, createPost } from "../actions/posts";
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

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/new"
            render={() =>
              <div>
                <PostForm onSubmit={values => this.handleSubmit(values)} />
                <FloatingButton path="/" character="&#129120;" />
              </div>}
          />
          {this.props.posts.map(post =>
            <Route
              exact
              key={post.id}
              path={`/${post.category}/${post.id}`}
              render={() =>
                <div>
                  <Header />
                  <Post history={this.props.history} post={post} />
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
