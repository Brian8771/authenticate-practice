import { csrfFetch } from './csrf';

const ALL_ALBUMS = 'albums/ALL_ALBUMS';

const get_all_albums = (albums) => {
    return {
        type: ALL_ALBUMS,
        albums
    }
}


export const getAllAlbums = () => async dispatch => {
    const response = await csrfFetch('/api/albums/');

    const albums = await response.json();
    dispatch(get_all_albums(albums))
}

const initialState = { allAlbums: {} };

const albumReducer = (state = initialState, action) => {

    let newState = { ...state };
    switch (action.type) {
        case (ALL_ALBUMS):
            action.albums.forEach(album => {
                newState.allAlbums[album.id] = album;
            })
            return newState;
        default:
            return state;
    }
}


export default albumReducer;
