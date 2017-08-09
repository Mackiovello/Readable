import React, { Component } from 'react';

class App extends Component {
  state = {
    categories: [],
    posts: []
  }

  componentWillMount() {
    const serverPath = 'http://localhost:5001';
    const authorizationHeader = { 'Authorization': 'myKey' };

    fetch(`${serverPath}/categories`, { headers: authorizationHeader })
      .then(res => res.json())
      .then(res => this.setState({ categories: res.categories }));

    fetch(`${serverPath}/posts`, { headers: authorizationHeader })
      .then(res => res.json())
      .then(res => this.setState({ posts: res }));
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
            this.state.posts.map(post => (
              <div className="posts__post" key={post.id}>
                <div className="posts__post-info">
                  <div>
                    <p className="posts__post-title">{post.title}</p>
                    <p className="posts__post-time">{this.getFormattedDate(post.timestamp)}</p>
                  </div>
                  <span className="posts__post-author">Author: {post.author}</span>
                </div>
                <div className="posts__votes">
                  <span>&#129093;</span>
                  <span className="posts__vote-score">{post.voteScore}</span>
                  <span>&#129095;</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
