export const UPVOTE = "UPVOTE";
export const DOWNVOTE = "DOWNVOTE";
export const CREATE_POST = "CREATE_POST";
export const DELETE_POST = "DELETE_POST";

export function upvote(post) {
  return dispatch => vote(post, "upVote", dispatch);
}

export function downvote(post) {
  return dispatch => vote(post, "downVote", dispatch);
}

function downvoteAction(post) {
  return {
    type: DOWNVOTE,
    post
  };
}

function upvoteAction(post) {
  return {
    type: UPVOTE,
    post
  };
}

const vote = (post, option, dispatch) => {
  return fetch(`http://localhost:5001/posts/${post.id}`, {
    method: "post",
    body: JSON.stringify({ option }),
    headers: {
      Authorization: "myKey",
      "Content-Type": "application/json"
    }
  }).then(() => {
    if (option === "upVote") {
      dispatch(upvoteAction(post));
    } else if (option === "downVote") {
      dispatch(downvoteAction(post));
    } else {
      throw new Error("option must be 'upVote' or 'downVote'");
    }
  });
};

export function createPost(post) {
  return dispatch => {
    return fetch(`http://localhost:5001/posts`, {
      method: "post",
      body: JSON.stringify(post),
      headers: {
        Authorization: "myKey",
        "Content-Type": "application/json"
      }
    }).then(dispatch(createPostAction(post)));
  };
}

export function createPostAction(post) {
  return {
    type: CREATE_POST,
    post
  };
}

export function deletePost(post) {
  return dispatch => {
    return fetch(`http://localhost:5001/posts/${post.id}`, {
      method: "delete",
      headers: { Authorization: "myKey" }
    }).then(
      dispatch({
        type: DELETE_POST,
        post
      })
    );
  };
}
