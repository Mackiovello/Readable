import React, { Component } from "react";
import "../styles/Post.css";
import { deletePost } from "../actions/posts";
import { connect } from "react-redux";
import Votes from "./Votes";
import Comments from "./Comments";
import { upvotePost, downvotePost } from "../actions/posts";
import { Link } from "react-router-dom";

class Post extends Component {
  constructor() {
    super();
    this.deletePost = this.deletePost.bind(this);
  }

  deletePost() {
    this.props.dispatch(deletePost(this.props.post));
    this.props.history.push("/");
  }

  render() {
    const { post } = this.props;
    const { title, body, author, category, id } = post;

    return (
      <div className="post-wrapper">
        <div className="post-card">
          <div className="post-card__header">
            <div className="post-card__header-info">
              <h2 className="post-card__title">
                {title}
              </h2>
              <div className="post-card__below-title">
                <span>
                  {author} - {this.props.comments.filter(comment => comment.parentId === post.id).length} comments
                </span>
                <div>
                  <button className="button" onClick={this.deletePost}>
                    delete
                  </button>
                  <button
                    className="button"
                    onClick={() =>
                      this.props.history.push(`/${category}/${id}/edit`)}
                  >
                    edit
                  </button>
                  <Link
                    to={`/${post.category}/${post.id}/comment`}
                    className="button"
                  >
                    Comment
                  </Link>
                </div>
              </div>
            </div>
            <Votes
              toVoteOn={this.props.post}
              upvote={upvotePost}
              downvote={downvotePost}
            />
          </div>
          <p className="post-card__body">
            {body}
          </p>
        </div>
        <Comments parentId={id} />
      </div>
    );
  }
}

export default connect(state => state)(Post);
