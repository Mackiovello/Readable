import React from "react";
import { Link } from "react-router-dom";
import "../styles/FloatingButton.css";

const FloatingButton = props => {
  return (
    <Link to={props.path} className="floating-button">
      <span>
        {props.character}
      </span>
    </Link>
  );
};

export default FloatingButton;
