import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import "../styles/Header.css";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1 className="header__headline"><Link to="/">Readable</Link></h1>
        <nav className="header__navigation">
          <Link to="/">all</Link>
          {this.props.categories.map(category =>
            <Link to={`/${category.path}`} key={category.name}>
              {category.name}
            </Link>
          )}
        </nav>
      </div>
    );
  }
}

export default withRouter(connect(state => state)(Header));
