import {
  createDbPost,
  votePost,
  deleteDbPost,
  getPosts,
  getComments
} from "../api";
import { addComment } from "./comments";

export const UPVOTE = "UPVOTE";
export const DOWNVOTE = "DOWNVOTE";
export const CREATE_POST = "CREATE_POST";
export const DELETE_POST = "DELETE_POST";
export const SORT_BY_VOTES = "SORT_BY_VOTES";
export const SORT_BY_DATE = "SORT_BY_DATE";

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
  return dispatch => createDbPost(post).then(dispatch(createPostAction(post)));
}

function createPostAction(post) {
  return {
    type: CREATE_POST,
    post
  };
}

export function deletePost(post) {
  return dispatch => {
    return deleteDbPost(post.id).then(
      dispatch({
        type: DELETE_POST,
        post
      })
    );
  };
}
