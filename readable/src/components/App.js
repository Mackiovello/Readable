import React, { Component } from "react";
import Posts from "./Posts";
import Header from "./Header";
import PostForm from "./PostForm";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class App extends Component {
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
                <Link to="/<new></new>" className="floating-button">
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
