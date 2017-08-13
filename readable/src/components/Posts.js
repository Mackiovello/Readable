import React, { Component } from "react";
import { Route, withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import "../styles/Posts.css";
import Votes from "./Votes";

class Posts extends Component {
  getFormattedDate(unixTime) {
    const dateObj = new Date(unixTime);
    return `${dateObj.getDate()}-${dateObj.getMonth() +
      1}-${dateObj.getFullYear()}`;
  }

  getPosts(posts) {
    return (
      <div>
        {posts.filter(post => post.deleted !== true).map(post =>
          <div className="posts__post" key={post.id}>
            <Link
              to={`/${post.category}/${post.id}`}
              className="posts__post-info"
            >
              <div>
                <p className="posts__post-title">
                  {post.title}
                </p>
                <p className="posts__post-time">
                  {this.getFormattedDate(post.timestamp)}
                </p>
              </div>
              <span className="posts__post-author">
                Author: {post.author}
              </span>
            </Link>
            <Votes post={post} />
          </div>
        )}
      </div>
    );
  }

  render() {
    const { posts, categories } = this.props;

    return (
      <div className="posts">
        {categories.map(category =>
          <Route
            key={category.name}
            path={`/${category.path}`}
            render={() =>
              this.getPosts(
                posts.filter(post => post.category === category.name)
              )}
          />
        )}

        <Route exact path="/" render={() => this.getPosts(posts)} />
      </div>
    );
  }
}

export default withRouter(connect(state => state)(Posts));
