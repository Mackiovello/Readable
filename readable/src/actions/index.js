export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';

export function upvote({ post }) {
    return {
        type: UPVOTE,
        post
    }
}

export function downvote({ post }) {
    return {
        type: DOWNVOTE,
        post
    }
}