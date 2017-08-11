import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { upvote, downvote } from "../actions";
import { connect } from "react-redux";
import "../styles/Posts.css";

class Posts extends Component {
  getFormattedDate(unixTime) {
    const dateObj = new Date(unixTime);
    return `${dateObj.getDate()}-${dateObj.getMonth()}-${dateObj.getFullYear()}`;
  }

  getPosts(posts) {
    return (
      <div>
        {posts.map(post =>
          <div className="posts__post" key={post.id}>
            <div className="posts__post-info">
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
            </div>
            <div className="posts__votes">
              <span
                className="posts__vote-button"
                onClick={() => this.props.dispatch(upvote(post))}
              >
                &#129093;
              </span>
              <span>
                {post.voteScore}
              </span>
              <span
                className="posts__vote-button"
                onClick={() => this.props.dispatch(downvote(post))}
              >
                &#129095;
              </span>
            </div>
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
