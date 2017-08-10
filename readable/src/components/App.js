import React, { Component } from 'react';
import Posts from './Posts';
import Header from './Header';
import PostForm from './PostForm';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/new" component={PostForm}/>
          <Route render={() => (
            <div>
              <Header/>
              <Posts/>
            </div>
          )}/>
        </Switch>
        <a className="floating-button"><span>+</span></a>
      </div>
    );
  }
}

export default App;
