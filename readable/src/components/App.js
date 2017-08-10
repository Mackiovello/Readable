import React, { Component } from 'react';
import Header from './Header';
import Posts from './Posts';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Posts/>
        <a className="floating-button"><span>+</span></a>
      </div>
    );
  }
}

export default App;
