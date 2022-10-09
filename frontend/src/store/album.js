import { csrfFetch } from './csrf';

const ALL_ALBUMS = 'albums/ALL_ALBUMS';
const CREATE_ALBUM = 'album/CREATE_ALBUM';
const EDIT_ALBUM = 'album/EDIT_ALBUM';
const DELETE_ALBUM = 'album/DELETE_ALBUM';

const get_all_albums = (albums) => {
    return {
        type: ALL_ALBUMS,
        albums
    }
}

const create_album = (album) => {
    return {
        type: CREATE_ALBUM,
        album
    }
}

const edit_album = (album) => {
    return {
        type: EDIT_ALBUM,
        album
    }
}

const delete_album = (id) => {
    return {
        type: DELETE_ALBUM,
        id
    }
}


export const getAllAlbums = () => async dispatch => {
    const response = await csrfFetch('/api/albums/');

    const albums = await response.json();
    dispatch(get_all_albums(albums))
}

export const createAlbum = (body) => async dispatch => {
    const { title, description, imageUrl } = body
    const response = await csrfFetch(`/api/albums/`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            imageUrl
        })
    })

    const album = await response.json();
    dispatch(create_album(album));
}

export const editAlbum = (id, body) => async dispatch => {
    const { title, description, imageUrl } = body
    const response = await fetch(`/api/albums/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            description,
            imageUrl
        })
    })

    const album = await response.json();
    dispatch(edit_album(album));
}

export const deleteAlbum = (id) => async dispatch => {
    const response = await fetch(`/api/albums/${id}`, {
        method: 'DELETE'
    })

    const album = await response.json();
    dispatch(delete_album(id));
    return album;
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
        case (CREATE_ALBUM):
            newState.allAlbums[action.album.id] = action.album;
            return newState;
        case (EDIT_ALBUM):
            newState.allAlbums[action.album.id] = action.album;
            return newState;
        case (DELETE_ALBUM):
            delete newState.allAlbums[action.id];
            return newState;
        default:
            return state;
    }
}


export default albumReducer;
