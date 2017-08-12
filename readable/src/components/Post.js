import React, { Component } from "react";
import "../styles/Post.css";
import { deletePost } from "../actions/posts";
import { connect } from "react-redux";
import Votes from "./Votes";

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
    const { title, body, author } = this.props.post;
    return (
      <div>
        <div className="post-card">
          <div className="post-card__header">
            <div className="post-card__header-info">
              <h2 className="post-card__title">{title}</h2>
              <div className="post-card__below-title">
                <span>{author}</span>
                <div>
                  <button className="button" onClick={this.deletePost}>delete</button>
                  <button className="button">edit</button>
                </div>
              </div>
            </div>
            <Votes post={this.props.post}/>
          </div>
          <p className="post-card__body">{body}</p>
        </div>
      </div> 
    )
  }
}

export default connect()(Post);