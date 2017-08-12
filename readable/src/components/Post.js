import React, { Component } from "react";
import "../styles/Post.css";

export default class Post extends Component {
  render() {
    const { title, body } = this.props.post;
    return (
      <div>
        <div className="post-card">
          <p className="post-card__body">{body}</p>
        </div>
      </div> 
    )
  }
}