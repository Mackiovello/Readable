import React, { Component } from 'react';

class App extends Component {
  state = {
    categories: []
  }

  componentWillMount() {
    fetch('http://localhost:5001/categories', { headers: { 'Authorization': 'whatever-you-want' }})
      .then(res => res.json())
      .then(res => this.setState({ categories: res.categories }))
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1 className="header__headline">Readable</h1>
          <nav className="header__navigation">
            {
              this.state.categories.map(category => 
                <a href={category.path} key={category.name}>{category.name}</a>
              )
            }
          </nav>
        </div>
      </div>
    );
  }
}

export default App;
