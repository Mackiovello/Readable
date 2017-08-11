import React, { Component } from "react";
import Posts from "./Posts";
import Header from "./Header";
import PostForm from "./PostForm";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createPost, createCategory } from "../actions";

class App extends Component {
  componentWillMount() {
    const serverPath = "http://localhost:5001";
    const authorizationHeader = { Authorization: "myKey" };

    fetch(`${serverPath}/posts`, { headers: authorizationHeader })
      .then(res => res.json())
      .then(res =>
        res.forEach(post => this.props.dispatch(createPost(post)), this)
      );

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
      <div>
        <Switch>
          <Route exact path="/new" component={PostForm} />
          <Route
            render={() =>
              <div>
                <Header />
                <Posts />
                <Link to="/new" className="floating-button">
                  <span>+</span>
                </Link>
              </div>}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect()(App));
