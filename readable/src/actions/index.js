export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';
export const CREATE_POST = 'CREATE_POST';

export function upvote(post) {
    return {
        type: UPVOTE,
        post
    }
}

export function downvote(post) {
    return {
        type: DOWNVOTE,
        post
    }
}

export function createPost({ author, body, category, deleted, id, timestamp, title, voteScore }) {
    return {
        type: CREATE_POST,
        post: {
            author,
            body,
            category,
            deleted,
            id,
            timestamp,
            title,
            voteScore
        }
    }
}


// author: "thingtwo"
// body: "Everyone says so after all."
// category: "react"
// deleted: false
// id: "8xf0y6ziyjabvozdd253nd"
// timestamp: 1467166872634
// title: "Udacity is the best place to learn React"
// voteScore: 6