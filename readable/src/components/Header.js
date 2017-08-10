import React, { Component } from 'react';

class Header extends Component {
    state = {
      categories: []
    }

    componentWillMount() {
      const serverPath = 'http://localhost:5001';
      const authorizationHeader = { 'Authorization': 'myKey' };

      fetch(`${serverPath}/categories`, { headers: authorizationHeader })
      .then(res => res.json())
      .then(res => this.setState({ categories: res.categories }));
    }

    render() {
      return (
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
      )
    }
}

export default Header;