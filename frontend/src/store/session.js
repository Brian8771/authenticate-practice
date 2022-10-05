import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVER_USER = 'session/removeUser';
const GET_CURRENT_ARTIST = 'session/GET_CURRENT_ARTIST';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVER_USER,
    };
};

const currentArtist = (artist) => {
    return {
        type: GET_CURRENT_ARTIST,
        payload: artist
    }
}

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });

    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data));
    return response;
}

export const signup = (user) => async (dispatch) => {
    const { username, email, firstName, lastName, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            firstName,
            lastName,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const getCurrentArtist = (id) => async dispatch => {
    const response = await csrfFetch(`/api/artists/${id}`)

    if (response.ok) {
        const artist = await response.json()
        dispatch(currentArtist(artist))
    }
}

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    dispatch(removeUser());
    return response;
}

const initialState = { user: null, currentArtistProfile: {} };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVER_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        case GET_CURRENT_ARTIST:
            newState = Object.assign({}, state);
            newState.currentArtistProfile = action.payload;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
