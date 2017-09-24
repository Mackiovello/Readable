import React from "react";
import { SORT_BY_DATE, SORT_BY_VOTES } from "../actions/types";
import { connect } from "react-redux";
import { SorterCard } from "./StyledComponents";

function Sorter({ sortByVotes, sortByDate }) {
  return (
    <SorterCard>
      <button className="button" onClick={sortByVotes}>
        Sort by votes
      </button>
      <button className="button" onClick={sortByDate}>
        Sort by date
      </button>
    </SorterCard>
  );
}

export default connect(null, dispatch => ({
  sortByVotes: () => dispatch({ type: SORT_BY_VOTES }),
  sortByDate: () => dispatch({ type: SORT_BY_DATE })
}))(Sorter);
