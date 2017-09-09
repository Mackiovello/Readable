import {
  createPostInDb,
  votePost,
  deletePostFromDb,
  getPosts,
  getComments
} from "../api";
import { addComment } from "./comments";
import { UPVOTE, DOWNVOTE, CREATE_POST, DELETE_POST } from "./types";

export function upvotePost(post) {
  return dispatch => vote(post, "upVote", dispatch);
}

export function downvotePost(post) {
  return dispatch => vote(post, "downVote", dispatch);
}

const vote = (post, option, dispatch) => {
  return votePost(post.id, option).then(() => {
    if (option === "upVote" || option === "downVote") {
      dispatch({
        type: option === "upVote" ? UPVOTE : DOWNVOTE,
        post
      });
    } else {
      throw new Error("option must be 'upVote' or 'downVote'");
    }
  });
};

export function initializePosts() {
  return dispatch =>
    getPosts().then(posts =>
      posts.forEach(post => {
        dispatch(createPostAction(post));
        getComments(post.id).then(comments =>
          comments.forEach(comment => dispatch(addComment(comment)), this)
        );
      }, this)
    );
}

export function createPost(post) {
  return dispatch =>
    createPostInDb(post).then(dispatch(createPostAction(post)));
}

function createPostAction(post) {
  return {
    type: CREATE_POST,
    post
  };
}

export function deletePost(post) {
  return dispatch => {
    return deletePostFromDb(post.id).then(
      dispatch({
        type: DELETE_POST,
        post
      })
    );
  };
}
