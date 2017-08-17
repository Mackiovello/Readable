const serverPath = "http://localhost:5001";
const Authorization = "myKey";

export function getComments(postId) {
  return fetch(`${serverPath}/posts/${postId}/comments`, {
    headers: { Authorization }
  }).then(comments => comments.json());
}

export function getPosts() {
  return fetch(`${serverPath}/posts`, {
    headers: { Authorization }
  }).then(res => res.json());
}

export function getCategories() {
  return fetch(`${serverPath}/categories`, {
    headers: { Authorization }
  })
    .then(res => res.json())
    .then(res => res.categories);
}

export function createDbPost(post) {
  return fetch(`${serverPath}/posts`, {
    method: "post",
    body: JSON.stringify(post),
    headers: {
      Authorization,
      "Content-Type": "application/json"
    }
  });
}

export function deleteDbPost(postId) {
  return fetch(`${serverPath}/posts/${postId}`, {
    method: "delete",
    headers: { Authorization }
  });
}

export function voteDb(postId, option) {
  return fetch(`${serverPath}/posts/${postId}`, {
    method: "post",
    body: JSON.stringify({ option }),
    headers: {
      Authorization,
      "Content-Type": "application/json"
    }
  });
}
