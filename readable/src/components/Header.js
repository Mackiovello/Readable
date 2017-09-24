import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header({ categories }) {
  return (
    <div className="header">
      <h1 className="header__headline">
        <Link to="/">Readable</Link>
      </h1>
      <nav className="header__navigation">
        <Link to="/">all</Link>
        {categories.map(category =>
          <Link to={`/${category.path}`} key={category.name}>
            {category.name}
          </Link>
        )}
      </nav>
    </div>
  );
}

export default connect(({ categories }) => ({ categories }))(Header);
