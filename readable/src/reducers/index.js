import {
    UPVOTE,
    DOWNVOTE
} from '../actions';

const inititalState = {
    posts: [
        {
            voteScore: 0
        }
    ]
}

function vote(state = inititalState, action) {

    console.log(action);
    console.log(state);

    const { post } = action;

    if (action.type === UPVOTE) {
        return {
            ...state,
            [post.voteScore]: [post.voteScore] + 1
        }
    } else if (action.type === DOWNVOTE) {
        return {
            ...state,
            [post.voteScore]: [post.voteScore] - 1
        }
    } else {
        return state;
    }
}

export default vote;