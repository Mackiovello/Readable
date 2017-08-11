import React, { Component } from "react";
import { createCategory } from "../actions";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

class Header extends Component {
  componentWillMount() {
    const serverPath = "http://localhost:5001";
    const authorizationHeader = { Authorization: "myKey" };

    fetch(`${serverPath}/categories`, { headers: authorizationHeader })
      .then(res => res.json())
      .then(res =>
        res.categories.forEach(
          category => this.props.dispatch(createCategory(category)),
          this
        )
      );
  }

  render() {
    return (
      <div className="header">
        <h1 className="header__headline">Readable</h1>
        <nav className="header__navigation">
          <Link to="/">all</Link>
          {this.props.categories.map(category =>
            <Link to={category.path} key={category.name}>
              {category.name}
            </Link>
          )}
        </nav>
      </div>
    );
  }
}

export default withRouter(connect(state => state)(Header));
