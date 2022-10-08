import { csrfFetch } from './csrf';

const ALL_ALBUMS = 'albums/ALL_ALBUMS';
const CREATE_ALBUM = 'album/CREATE_ALBUM';

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

    const album = await response.json()
    dispatch(create_album(album))
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
            newState.allAlbums[action.album.id] = action.album
            return newState
        default:
            return state;
    }
}


export default albumReducer;
