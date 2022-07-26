import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as songActions from '../../store/Songs';
import {Link, useHistory} from 'react-router-dom';
import './mysongs.css';


function UserSongs() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);


    const songs = Object.values(useSelector(state => state.songDetail.userSongs));
    const user = useSelector(state => state.session.user);

    if (user === null) {
        history.push('/')
        alert('Must be logged in to view MySongs');
    }

    useEffect(() =>{
        dispatch(songActions.getSongsByUser()).then(() =>
        setIsLoaded(true))
    }
    , [dispatch, user])

    return (
       <div  style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ECECEC', height: '100%', width: '100%', flexDirection: 'column', alignItems: 'center'}}>
        <ul className='grid' >
        {isLoaded && songs &&
        songs.map(song =>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <li className='gridChildren' key={song.id}>
                <Link to={`/songs/${song.id}`}>

                <img style={{height: '6em', width: '6em'}} src='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png' alt={song.description} />
                </Link>
                <br/>
                {song.title}
                <br/>
                {song.description}
                <br />
            </li>
            </div>
            )}
        {songs.length === 0 && <h1>Sign in to view Songs</h1>}

        </ul>
       </div>
    )
}

export default UserSongs;
