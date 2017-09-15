import React, { Component } from "react";
import "../styles/PostForm.css";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class PostForm extends Component {
  componentDidMount() {
    const { initialData, initialize } = this.props;
    initialData && initialize(initialData);
  }

  render() {
    const { handleSubmit, categories, cancelLink, headerText } = this.props;

    return (
      <div>
        <div className="header header--thin">
          <h1 className="header__headline">
            {headerText}
          </h1>
        </div>
        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-card__text-field">
            <label htmlFor="titleInput">Title</label>
            <Field component="input" name="title" id="titleInput" type="text" />
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
              <Field component="select" name="category" id="categorySelect">
                {categories.map(category =>
                  <option key={category.name}>
                    {category.name}
                  </option>
                )}
              </Field>
            </div>
          </div>

          <div className="form-card__text-field">
            <label htmlFor="bodyInput">Body</label>
            <Field component="textarea" name="body" id="bodyInput" />
          </div>

          <div className="form-card__buttons">
            <button className="button" type="submit">
              submit
            </button>
            <Link to={cancelLink} className="button">
              cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return { categories };
}

export default reduxForm({
  form: "postForm"
})(connect(mapStateToProps)(PostForm));
