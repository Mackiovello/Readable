import React, { Component } from 'react';
import { upvote, downvote, createPost } from '../actions';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

class App extends Component {
  state = {
    categories: []
  }

  componentWillMount() {
    const serverPath = 'http://localhost:5001';
    const authorizationHeader = { 'Authorization': 'myKey' };

    fetch(`${serverPath}/categories`, { headers: authorizationHeader })
      .then(res => res.json())
      .then(res => this.setState({ categories: res.categories }));

    fetch(`${serverPath}/posts`, { headers: authorizationHeader })
      .then(res => res.json())
      .then(res => res.forEach(post => this.props.createPost(post), this));
  }

  getFormattedDate(unixTime) {
    const dateObj = new Date(unixTime);
    return `${dateObj.getDate()}-${dateObj.getMonth()}-${dateObj.getFullYear()}`
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
        <div className="posts">
          {
            this.props.posts.map(post => (
              <div className="posts__post" key={post.id}>
                <div className="posts__post-info">
                  <div>
                    <p className="posts__post-title">{post.title}</p>
                    <p className="posts__post-time">{this.getFormattedDate(post.timestamp)}</p>
                  </div>
                  <span className="posts__post-author">Author: {post.author}</span>
                </div>
                <div className="posts__votes">
                  <span className="posts__vote-button" onClick={() => this.props.upvote(post)}>&#129093;</span>
                  <span>{post.voteScore}</span>
                  <span className="posts__vote-button" onClick={() => this.props.downvote(post)}>&#129095;</span>
                </div>
              </div>
            ))
          }
        </div>
        <a className="floating-button"><span>+</span></a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    upvote: data => dispatch(upvote(data)),
    downvote: data => dispatch(downvote(data)),
    createPost: post => dispatch(createPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
