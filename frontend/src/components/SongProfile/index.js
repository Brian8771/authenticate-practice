import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as songActions from '../../store/Songs';
import {useHistory, useParams} from 'react-router-dom';

function SongProfile() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    // const [addDelete, setAddDelete] = useState(false);
    const {songId} = useParams();
    // const songs = useSelector(state => state.songDetail.songs[songId]);
    const songs = useSelector(state => state.songDetail.currentSong);
    // const user = useSelector(state => state.session.user.id);
    console.log(songs)
    // if (songs && songs.userId === user) {
    //     setAddDelete(true)

    // }

    useEffect(() => {

        dispatch(songActions.getSongByIdNum(songId)).then(() =>
        setIsLoaded(true))

    }, [dispatch, songId])

    return (
        <>
        {isLoaded &&
        <div style={{display: 'flex', justifyContent: 'center', margin: 'auto', flexDirection: 'column', alignItems: 'center'}}>
            <img style={{height: '6em', width: '6em'}} src='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png' alt={songs.description} />
            <h2>{songs[songId].songs.title}</h2>
            <h3>{songs[songId].songs.description}</h3>
            <button onClick={() => history.push('/')}>Back</button>
            {/* {addDelete && <button>Delete</button>} */}
        </div>
        }
        </>
    )
}

export default SongProfile;
