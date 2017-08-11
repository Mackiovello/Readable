import React, { Component } from "react";
import "../styles/PostForm.css";
import { Field, reduxForm } from "redux-form";

class PostForm extends Component {

  render() {
    const { handleSubmit } = this.props;
    
    return (
      <div>
        <div className="header header--thin">
          <h1 className="header__headline">Create New Post</h1>
        </div>
        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-card__text-field">
            <label htmlFor="titleInput">Title</label>
            <Field 
              component="input"
              name="title" 
              id="titleInput" 
              type="text" 
            />
          </div>

          <div className="form-card__combined_row">
            <div className="form-card__text-field form-card__text-field--large">
              <label htmlFor="authorInput">Author</label>
              <Field
                component="input"
                name="author"
                id="authorInput" 
                type="text" 
              />
            </div>

            <div className="form-card__drop-down">
              <label htmlFor="categorySelect">Category</label>
              <Field
                component="select"
                name="category" 
                id="categorySelect"
              >
                <option>option1</option>
                <option>option2</option>
                <option>option3</option>
                <option>option4</option>
              </Field>
            </div>
          </div>

          <div className="form-card__text-field">
            <label htmlFor="bodyInput">Body</label>
            <Field 
              component="textarea"
              name="body" 
              id="bodyInput"
            />
          </div>

          <div className="form-card__buttons">
            <button className="button" type="submit">submit</button>
            <button className="button">cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({ 
  form: "postForm" 
})(PostForm);
