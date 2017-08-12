import React, { Component } from "react";
import "../styles/Post.css";

export default class Post extends Component {
  render() {
    const { title, body, author } = this.props.post;
    return (
      <div>
        <div className="post-card">
          <h2 className="post-card__title">{title}</h2>
          <p className="post-card__body">{body}</p>
          <div className="post-card__footer">
            <span>{author}</span>
            <div>
              <button className="button">delete</button>
              <button className="button">edit</button>
            </div>
          </div>
        </div>
      </div> 
    )
  }
}