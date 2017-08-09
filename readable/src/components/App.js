import React, { Component } from 'react';
import '../css/App.css';

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
      <ul>
        {
          this.state.categories.map(category => <li key={category.name}>{category.name}</li>)
        }
      </ul>
    );
  }
}

export default App;
