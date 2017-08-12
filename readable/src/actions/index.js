export const UPVOTE = "UPVOTE";
export const DOWNVOTE = "DOWNVOTE";
export const CREATE_POST = "CREATE_POST";
export const CREATE_CATEGORY = "CREATE_CATEGORY";

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
  return fetch(`http://localhost:5001/posts/${post.id}`,
    { 
      method: "post", 
      body: JSON.stringify({ option }),
      headers: { 
        Authorization: "myKey", 
        "Content-Type": "application/json" 
      }, 
    }).then(
    () => {
      if (option === "upVote") {
        dispatch(upvoteAction(post));
      } else if (option === "downVote") {
        dispatch(downvoteAction(post));
      } else {
        throw new Error("option must be 'upVote' or 'downVote'");
      }
    }
  )
}

export function createCategory(category) {
  return {
    type: CREATE_CATEGORY,
    category
  };
}

export function createPost(post) {
  return dispatch => {
    return fetch(`http://localhost:5001/posts`,
      { 
        method: "post", 
        body: JSON.stringify(post),
        headers: { 
          Authorization: "myKey", 
          "Content-Type": "application/json" 
        }, 
      }).then(dispatch(createPostAction(post)))
  }
}

export function createPostAction(post){
  return {
    type: CREATE_POST,
    post
  };
}