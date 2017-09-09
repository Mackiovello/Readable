import React from "react";
import "../styles/Votes.css";
import { connect } from "react-redux";

function Votes({ dispatch, toVoteOn, upvote, downvote }) {
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

export default connect(null)(Votes);
