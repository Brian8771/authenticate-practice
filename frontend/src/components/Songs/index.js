import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as songActions from '../../store/Songs';
import {Link} from 'react-router-dom';

function Songs() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);


    const songs = Object.values(useSelector(state => state.songDetail.songs));

    useEffect(() =>{
        dispatch(songActions.getSongs()).then(() =>
        setIsLoaded(true))
    }
    , [dispatch])

    return (
       <div style={{display: 'flex', justifyContent: 'center', margin: 'auto'}}>
        <ul style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '80%', flexFlow: 'row wrap'}}>
        {isLoaded &&
        songs.map(song =>
            <li key={song.id}>
                <Link to={`/songs/${song.id}`}>

                <img style={{height: '6em', width: '6em'}} src='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png' alt={song.description} />
                </Link>
                <br/>
                {song.title}
                <br/>
                {song.description}
                <br />
            </li>)
        }

        </ul>
       </div>
    )
}

export default Songs;
