import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as songActions from '../../store/Songs';
import { Link, NavLink } from 'react-router-dom';
import './mysongs.css';


function UserSongs() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);


    const songs = Object.values(useSelector(state => state.songDetail.userSongs));
    const user = useSelector(state => state.session.user);
    const albums = Object.values(useSelector(state => state.albums.allAlbums)).filter(x => x.userId === user.id)
    console.log(albums);

    // if (user === null) {
    //     history.push('/')
    //     alert('Must be logged in to view MySongs');
    // }

    useEffect(() => {
        dispatch(songActions.getSongsByUser()).then(() =>
            setIsLoaded(true))
    }
        , [dispatch, user])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ECECEC', height: '100vh', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className='header' style={{ backgroundColor: 'white', width: '80%', margin: 0, padding: '30px 0' }}>My Songs:</h2>
            <ul className='grid' style={{ alignItems: 'flex-start' }}>
                <div className="innerGrid">
                    {isLoaded && songs &&
                        songs.map(song =>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <li className='gridChildren' key={song.id}>
                                    <Link to={`/songs/${song.id}`}>
                                        {
                                            song.previewImage.endsWith('.jpg') ?
                                                <img style={{ height: '10em', width: '10em' }} src={song.previewImage} alt={song.description} /> :
                                                <img style={{ height: '10em', width: '10em' }} src='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png' alt={song.description} />
                                        }
                                    </Link>
                                    <br />
                                    <div style={{ fontWeight: 550, fontSize: '14px' }}>
                                        {song.title}
                                    </div>
                                    <div style={{ display: 'border-box', height: '30px', width: '100px', fontSize: '12px' }}>
                                        {song.description}
                                    </div>
                                    <br />
                                </li>
                            </div>
                        )}
                    {/* {songs.length === 0 && <h1>Sign in to view Songs</h1>} */}
                </div>
            </ul>
            <h2 className='header' style={{ backgroundColor: 'white', width: '80%', margin: 0, paddingTop: '0px', height: '10vh' }}>My Albums:</h2>
            <ul className='grid' >
                <div className="innerGrid">
                    {isLoaded && albums && songs &&
                        albums.map(album =>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <li className='gridChildren' key={album.id}  >
                                    <Link to={`/`}>
                                        {
                                            album.previewImage.endsWith('.jpg') ?
                                                <img style={{ height: '10em', width: '10em' }} src={album.previewImage} alt={album.description} /> :
                                                <img style={{ height: '10em', width: '10em' }} src='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png' alt={album.description} />
                                        }
                                    </Link>
                                    <br />
                                    <NavLink to={`/artists/${album.User.id}`} style={{ textDecoration: 'none', display: 'border-box', width: '160px', fontSize: '14px', margin: 0, color: '#c6c6c6' }}>
                                        {album.User.username}
                                    </NavLink>
                                    <div style={{ fontWeight: 550, fontSize: '14px' }}>
                                        {album.title}
                                    </div>
                                    <br />
                                </li>
                            </div>
                        )
                    }
                </div>

            </ul>
        </div>
    )
}

export default UserSongs;
