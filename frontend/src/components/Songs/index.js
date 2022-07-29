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
        dispatch(songActions.getSongs()).then(dispatch(songActions.getSongsByUser())).then(() =>
        setIsLoaded(true))
    }
    , [dispatch, songs])
    // style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '80%', flexFlow: 'row wrap', listStyleType: 'none', margin: 0,}}
    return (
       <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ECECEC', height: '100vh', width: '100%', flexDirection: 'column', alignItems: 'center'}}>
        <h2 className='header' style={{backgroundColor: 'white', width: '80%', margin: 0, padding: '30px 0', height: '20vh'}}>Songs</h2>
        <ul className='grid' >
        {isLoaded && songs &&
        songs.map(song =>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

            <li className='gridChildren' key={song.id}  >
                <Link to={`/songs/${song.id}`}>
                {
                    song.previewImage.endsWith('.jpg') ?
                    <img style={{height: '10em', width: '10em'}} src={song.previewImage} alt={song.description}/> :
                    <img style={{height: '10em', width: '10em'}} src='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png' alt={song.description} />
                }
                </Link>
                <br/>
                <div style={{fontWeight: 550, fontSize: '14px'}}>
                {song.title}
                </div>
                <div style={{display: 'border-box', height: '30px', width: '160px', fontSize:'12px', margin: 0}}>
                {song.description}
                </div>
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
