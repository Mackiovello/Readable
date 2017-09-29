import React, { Component } from "react";
import { connect } from "react-redux";
import Votes from "../components/Votes";
import Comments from "../components/Comments";
import {
  upvotePost,
  downvotePost,
  deletePost as deletePostAction
} from "../actions/posts";
import { Link } from "react-router-dom";
import styled from "styled-components";

class Post extends Component {
  constructor() {
    super();
    this.deletePost = this.deletePost.bind(this);
  }

  deletePost() {
    const { deletePost, post, history } = this.props;
    deletePost(post);
    history.push("/");
  }

  render() {
    const { post, history, comments } = this.props;
    const { title, body, author, category, id } = post;

    return (
      <Wrapper>
        <Card>
          <CardHeader>
            <div style={{ flexGrow: "1" }}>
              <CardTitle>
                {title}
              </CardTitle>
              <CardBelowTitle>
                <span>
                  {author} -{" "}
                  {
                    comments.filter(comment => comment.parentId === post.id)
                      .length
                  }{" "}
                  comments
                </span>
                <div>
                  <button className="button" onClick={this.deletePost}>
                    delete
                  </button>
                  <button
                    className="button"
                    onClick={() => history.push(`/${category}/${id}/edit`)}
                  >
                    edit
                  </button>
                  <Link
                    to={`/${post.category}/${post.id}/comment`}
                    className="button"
                  >
                    Comment
                  </Link>
                </div>
              </CardBelowTitle>
            </div>
            <Votes
              toVoteOn={this.props.post}
              upvote={upvotePost}
              downvote={downvotePost}
            />
          </CardHeader>
          <CardBody>
            {body}
          </CardBody>
        </Card>
        <Comments parentId={id} />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 30px auto;
`;

const Card = styled.div`
  background-color: #fff;
  box-shadow: 0 1px 3px #999;
  border-radius: 4px;
`;

const CardTitle = styled.h2`
  font-weight: normal;
  margin-bottom: 10px;
`;

const CardBody = styled.p`
  padding: 1.8em;
  margin: 0;
  line-height: 1.7em;
  font-size: 1.05em;
`;

const CardHeader = styled.div`
  margin: 0;
  padding: 0 0 0 1.4em;
  box-shadow: 0 1px 4px #ddd;
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-between;
`;

const CardBelowTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5em;
`;

export default connect(
  ({ comments }) => ({ comments }),
  dispatch => ({ deletePost: post => dispatch(deletePostAction(post)) })
)(Post);
