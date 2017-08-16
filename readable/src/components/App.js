import React, { Component } from "react";
import Posts from "./Posts";
import Header from "./Header";
import PostForm from "./PostForm";
import FloatingButton from "./FloatingButton";
import Post from "./Post";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createCategory } from "../actions/categories";
import { createPostAction, createPost } from "../actions/posts";
import { getPosts, getCategories } from "../api";

class App extends Component {
  componentWillMount() {
    const { dispatch } = this.props;

    getPosts().then(posts =>
      posts.forEach(post => dispatch(createPostAction(post)), this)
    );

    getCategories().then(categories => 
      categories.forEach(category => dispatch(createCategory(category)), this)
    );
  }

  // taken from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript with slight modifications
  generateId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
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
        id: this.generateId(),
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
