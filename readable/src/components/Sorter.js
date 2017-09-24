import React from "react";
import "../styles/Sorter.css";
import { SORT_BY_DATE, SORT_BY_VOTES } from "../actions/types";
import { connect } from "react-redux";

function Sorter({ sortByVotes, sortByDate }) {
  return (
    <div className="sorter-card">
      <button className="button" onClick={sortByVotes}>
        Sort by votes
      </button>
      <button className="button" onClick={sortByDate}>
        Sort by date
      </button>
    </div>
  );
}

export default connect(null, dispatch => ({
  sortByVotes: () => dispatch({ type: SORT_BY_VOTES }),
  sortByDate: () => dispatch({ type: SORT_BY_DATE })
}))(Sorter);
