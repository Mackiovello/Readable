import React, { Component } from "react";
import "../styles/Votes.css";
import { connect } from "react-redux";
import { upvote, downvote } from "../actions/posts";

class Votes extends Component {
  render() {
    const { dispatch, post } = this.props;

    return (
      <div className="posts__votes">
        <span
          className="posts__vote-button"
          onClick={() => dispatch(upvote(post))}
        >
          &#129093;
        </span>
        <span>{post.voteScore}</span>
        <span
          className="posts__vote-button"
          onClick={() => dispatch(downvote(post))}
        >
          &#129095;
        </span>
      </div>
    )
  }
}

export default connect()(Votes);