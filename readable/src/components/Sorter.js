import React, { Component } from "react";
import "../styles/Sorter.css";
import { SORT_BY_DATE, SORT_BY_VOTES } from "../actions/posts";
import { connect } from "react-redux";

class Sorter extends Component {
  render() {
    return (
      <div className="sorter-card">
        <button
          className="button"
          onClick={() => this.props.dispatch({ type: SORT_BY_VOTES })}
        >
          Sort by votes
        </button>
        <button
          className="button"
          onClick={() => this.props.dispatch({ type: SORT_BY_DATE })}
        >
          Sort by date
        </button>
      </div>
    );
  }
}

export default connect(state => state)(Sorter);
