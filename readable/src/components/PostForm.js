import React, { Component } from "react";
import "../styles/PostForm.css";

class PostForm extends Component {
  render() {
    return (
      <div>
        <div className="header header--thin">
          <h1 className="header__headline">Create New Post</h1>
        </div>
        <form className="form-card">
          <div className="form-card__text-field">
            <label htmlFor="titleInput">Title</label>
            <input id="titleInput" type="text" />
          </div>

          <div className="form-card__combined_row">
            <div className="form-card__text-field form-card__text-field--large">
              <label htmlFor="authorInput">Author</label>
              <input id="authorInput" type="text" />
            </div>

            <div className="form-card__drop-down">
              <label htmlFor="categorySelect">Category</label>
              <select id="categorySelect">
                <option>option1</option>
                <option>option2</option>
                <option>option3</option>
                <option>option4</option>
              </select>
            </div>
          </div>

          <div className="form-card__text-field">
            <label htmlFor="bodyInput">Body</label>
            <textarea id="bodyInput" />
          </div>
        </form>
      </div>
    );
  }
}

export default PostForm;
