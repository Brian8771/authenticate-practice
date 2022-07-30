import { csrfFetch } from "./csrf";

const GET_COMMENTS = 'comments/getComments';
const CREATE_COMMENT = 'comments/createComments';
const DELETE_COMMENT = 'comments/deleteComments';

const commentById = (comments) => {
    return {
        type:GET_COMMENTS,
        comments
    }
}

const createComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    }
}
const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    };
};

export const getCommentsById = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${songId}/comments`);
    const comments = await response.json();
    dispatch(commentById(comments));
    return comments;
}

export const createComments = (songId, body) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${songId}/comments`, {
        method: 'POST',
        body: JSON.stringify({body})
    });
    const comment = await response.json();
    dispatch(createComment(comment));
    return comment;
}

export const deleteComments = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${songId}`, {
        method: 'DELETE'
    });

    const comment = await response.json();
    dispatch(deleteComment(songId));
    return comment;
}

const initialState = {comments: {}}

const commentsReducer = (state = initialState, action) => {
    let newState = {comments: {}};
    switch(action.type){
        case(GET_COMMENTS):
        action.comments.forEach(comment => {
            newState.comments[comment.id] = comment;
        })
        return newState;
        case(CREATE_COMMENT):
        newState.comments[action.comment.id] = action.comment;
        return newState;
        case(DELETE_COMMENT):
        delete newState.comments[action.commentId];
        return newState;
        default:
        return state;
    }
}

export default commentsReducer;
