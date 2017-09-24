import React, { Component } from "react";
import { Route, withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import "../styles/Posts.css";
import Votes from "./Votes";
import Sorter from "./Sorter";
import { getFormattedDate } from "../helpers";
import {
  upvotePost,
  downvotePost,
  deletePost as deletePostAction
} from "../actions/posts";
import Actions from "./Actions";

class Posts extends Component {
  getPosts(posts) {
    const { comments, deletePost } = this.props;
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
                  {getFormattedDate(post.timestamp)}
                </p>
              </div>
              <span className="posts__post-author-comments">
                <span>
                  Author: {post.author}
                </span>
                <span>
                  {
                    comments.filter(comment => comment.parentId === post.id)
                      .length
                  }{" "}
                  comments
                </span>
              </span>
            </Link>
            <Actions
              editLink={`/${post.category}/${post.id}/edit`}
              onDelete={() => deletePost(post)}
            />
            <Votes
              toVoteOn={post}
              upvote={upvotePost}
              downvote={downvotePost}
            />
          </div>
        )}
      </div>
    );
  }

  render() {
    const { posts, categories } = this.props;

    return (
      <div className="posts">
        <Sorter />
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

function mapDispatchToProps(dispatch) {
  return {
    deletePost: post => dispatch(deletePostAction(post))
  };
}

export default withRouter(
  connect(
    ({ categories, comments, posts }) => ({ categories, comments, posts }),
    dispatch => ({
      deletePost: post => dispatch(deletePostAction(post))
    })
  )(Posts)
);
