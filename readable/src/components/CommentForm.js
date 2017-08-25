import React, { Component } from "react";
import "../styles/PostForm.css";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

class CommentForm extends Component {
  render() {
    const { handleSubmit, cancelLink } = this.props;

    return (
      <div>
        <div className="header header--thin">
          <h1 className="header__headline">
            {this.props.headerText}
          </h1>
        </div>
        <form className="form-card" onSubmit={handleSubmit}>
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
})(withRouter(connect(state => state)(CommentForm)));