import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { upvote, downvote, createPost } from '../actions';
import { connect } from 'react-redux';

class Posts extends Component {
  getFormattedDate(unixTime) {
    const dateObj = new Date(unixTime);
    return `${dateObj.getDate()}-${dateObj.getMonth()}-${dateObj.getFullYear()}`
  }

  componentWillMount() {
    const serverPath = 'http://localhost:5001';
    const authorizationHeader = { 'Authorization': 'myKey' };

    fetch(`${serverPath}/posts`, { headers: authorizationHeader })
      .then(res => res.json())
      .then(res => res.forEach(post => this.props.createPost(post), this));
  }

  getPosts(posts) {
    return (
      <div>
      { 
        posts.map(post => (
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
    )
  }

  render() {
    const { posts, categories } = this.props;

    return (
      <div className="posts">
        {
          categories.map(category => (
            <Route key={category.name} path={`/${category.path}`} render={() => this.getPosts(posts.filter(post => post.category === category.name))}/>
          ))
        }
        
        <Route exact path="/" render={() => this.getPosts(posts)}/>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Posts);