import React from "react";
import { Link } from "react-router-dom";

const FloatingButton = props => {
  return (
    <Link to={props.path} style={styles}>
      <span>
        {props.character}
      </span>
    </Link>
  );
};

const styles = {
  backgroundColor: "var(--primary-color)",
  position: "fixed",
  bottom: "20px",
  right: "20px",
  borderRadius: "50%",
  height: "50px",
  width: "50px",
  boxShadow: "0 2px 10px #999",
  fontSize: "2.5em",
  color: "#333",
  lineHeight: "50px",
  textAlign: "center",
  cursor: "pointer",
  userSelect: "none",
  textDecoration: "none"
};

export default FloatingButton;
