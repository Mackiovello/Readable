import React, { Component } from "react";
import "../styles/PostForm.css";
import { Field, reduxForm } from "redux-form";
import { withRouter, Link } from "react-router-dom";
import Header from "./Header.js";

class CommentForm extends Component {
  componentDidMount() {
    this.props.initialData && this.props.initialize(this.props.initialData);
  }

  render() {
    const { cancelLink, handleSubmit, headerText } = this.props;

    return (
      <div>
        <Header thin headerText={headerText} />
        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-card__text-field">
            <label htmlFor="authorInput">Author</label>
            <Field
              component="input"
              name="author"
              id="authorInput"
              type="text"
            />
          </div>

          <div className="form-card__text-field">
            <label htmlFor="bodyInput">Comment</label>
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

export default reduxForm({
  form: "commentForm"
})(withRouter(CommentForm));
