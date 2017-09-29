import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

function Votes({ dispatch, toVoteOn, upvote, downvote }) {
  return (
    <Wrapper>
      <VoteButton
        className="posts__vote-button"
        onClick={() => dispatch(upvote(toVoteOn))}
      >
        &#129093;
      </VoteButton>
      <span>
        {toVoteOn.voteScore}
      </span>
      <VoteButton
        className="posts__vote-button"
        onClick={() => dispatch(downvote(toVoteOn))}
      >
        &#129095;
      </VoteButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 60px;
  justify-content: space-around;
  text-align: center;
  align-self: center;
  background-color: #f8f8f8;
`;

const VoteButton = styled.span`
  color: var(--primary-color);
  text-shadow: 0 1px 3px #999;
  font-size: 1.8rem;
  cursor: pointer;
  user-select: none;
`;

export default connect(null)(Votes);
