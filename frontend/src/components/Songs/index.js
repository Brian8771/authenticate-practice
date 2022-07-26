import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as songActions from '../../store/Songs';
import {Link} from 'react-router-dom';
import './Songs.css';

function Songs() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);


    const songs = Object.values(useSelector(state => state.songDetail.songs));

    useEffect(() =>{
        dispatch(songActions.getSongs()).then(() =>
        setIsLoaded(true))
    }
    , [dispatch, songs])

    return (
       <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#CC', height: '100%', width: '100%'}}>
        <ul style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '80%', flexFlow: 'row wrap', margin: '0 10%', listStyleType: 'none'}}>
        {isLoaded && songs &&
        <h2>Songs:</h2> &&
        songs.map(song =>
            <div className='divContainer'>

            <li key={song.id}  >
                <Link to={`/songs/${song.id}`}>

                <img style={{height: '6em', width: '6em',}} src='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png' alt={song.description} />
                </Link>
                <br/>
                <div style={{fontWeight: 550}}>
                {song.title}
                </div>
                <br/>
                {song.description}
                <br />
            </li>
            </div>
        )
        }

        </ul>
       </div>
    )
}

export default Songs;
