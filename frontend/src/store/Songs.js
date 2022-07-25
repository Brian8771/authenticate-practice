import {csrfFetch} from './csrf';

const CREATE_SONG = 'songs/createSong';
const GET_SONG_BYID = 'songs/getSongById';
const SET_SONGS = 'songs/setSongs';
const SET_SONGS_FOR_USER = 'songs/setSongForUser';
const EDIT_SONG = 'songs/editSong';
const DELETE_SONG = 'songs/deleteSong';

const createSong = (song) => {
    return {
        type: CREATE_SONG,
        song
    };
}


const setSongs = (songs) => {
    return {
        type: SET_SONGS,
        songs
    };
}

const setSongsUser = (songs) => {
    return {
        type: SET_SONGS_FOR_USER,
        songs
    }
}

const getSongById = (song) => {
    return {
        type: GET_SONG_BYID,
        song
    }
}

const editedSong = (song) => {
    return {
        type: EDIT_SONG,
        song
    }
}

const deleteASong = (songId) => {
    return {
        type: DELETE_SONG,
        songId
    }
}


export const getSongs = () => async (dispatch) => {
    const response = await csrfFetch('/api/songs');
    const songs = await response.json();
    dispatch(setSongs(songs));
    return response;
}

export const getSongByIdNum = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${songId}`);
    const song = await response.json();
    dispatch(getSongById(song));
    return song;
}

export const getSongsByUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/songs/current');
    const songs = await response.json();
    dispatch(setSongsUser(songs));
    return response;
}

export const createSongs = (createdSong) => async (dispatch) => {
    const {title, description, url, imageUrl, albumId} = createdSong;
    const response = await csrfFetch(`/api/albums/${albumId}/songs`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            url,
            imageUrl,
        })
    });
    const song = await response.json();
    dispatch(createSong(song));
    return song;
}

export const editSong = (songId, songToEdit) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${songId}`, {
        method: 'PUT',
        body: JSON.stringify(songToEdit)
    });
    const song = await response.json();
    dispatch(editedSong(song));
    return response;
}

export const deleteSong = (songId) => async(dispatch) => {
    const response = await csrfFetch(`/api/songs/${songId}`, {
        method: 'DELETE'
    });

    const song = await response.json();
    dispatch(deleteASong(songId));
    return song;
}

const initialState = {songs: {}, userSongs:{}, currentSong:{}};

const songsReducer = (state = initialState, action) => {

    let newState = {...state};
    switch(action.type){
        case(SET_SONGS):
        action.songs.songs.forEach(song => {
            newState.songs[song.id] = song;
        })
        return newState;

        case(SET_SONGS_FOR_USER):
        action.songs.forEach(song => {
            newState.userSongs[song.id] = song;
        })
        return newState;
        case(GET_SONG_BYID):
        newState.currentSong = {};
        newState.currentSong[action.song.songs.id] = action.song;
        return newState;
        case(CREATE_SONG):
        newState.songs[action.song.id] = action.song;
        return newState;
        case(EDIT_SONG):
        newState.songs[action.song.id] = action.song;
        return newState;
        case(DELETE_SONG):
        delete newState.songs[action.songId];
        return newState;
        default:
        return state;
    }
}

export default songsReducer;
