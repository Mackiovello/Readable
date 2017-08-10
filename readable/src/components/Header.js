import React, { Component } from 'react';
import { createCategory } from '../actions';
import { connect } from 'react-redux';

class Header extends Component {
    componentWillMount() {
      const serverPath = 'http://localhost:5001';
      const authorizationHeader = { 'Authorization': 'myKey' };

      fetch(`${serverPath}/categories`, { headers: authorizationHeader })
      .then(res => res.json())
      .then(res => res.categories.forEach(category => this.props.createCategory(category), this));
    }

    render() {
      return (
        <div className="header">
          <h1 className="header__headline">Readable</h1>
          <nav className="header__navigation">
            <a href="/">all</a>
            {
              this.props.categories.map(category => 
                <a href={category.path} key={category.name}>{category.name}</a>
              )
            }
          </nav>
        </div>
      )
    }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    createCategory: category => dispatch(createCategory(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);