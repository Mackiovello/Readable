import React, { Component } from "react";
import "../styles/Votes.css";
import { connect } from "react-redux";

class Votes extends Component {
  render() {
    const { dispatch, toVoteOn, upvote, downvote } = this.props;

    return (
      <div className="posts__votes">
        <span
          className="posts__vote-button"
          onClick={() => dispatch(upvote(toVoteOn))}
        >
          &#129093;
        </span>
        <span>
          {toVoteOn.voteScore}
        </span>
        <span
          className="posts__vote-button"
          onClick={() => dispatch(downvote(toVoteOn))}
        >
          &#129095;
        </span>
      </div>
    );
  }
}

export default connect()(Votes);
