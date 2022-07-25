import { csrfFetch } from "./csrf";

const GET_COMMENTS = 'comments/getComments';

const commentById = (comments) => {
    return {
        type:GET_COMMENTS,
        comments
    }
}

export const getComments = (song) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${song.id}/comments`);
    const comments = await response.json();
    dispatch(commentById(comments));
    return response;
}


const commentsReducer = (state = {}, action) => {
    let newState = {};
    switch(action.type){
        case(GET_COMMENTS):
        action.comments.forEach(comment => {
            newState[comment.id] = comment;
        })
        return newState;
        default:
        return state;
    }
}

export default commentsReducer;
