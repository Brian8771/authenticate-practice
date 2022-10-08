import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllAlbums } from "../../store/album";

import { getCurrentArtist } from "../../store/session";
import { getSongsByUserId } from "../../store/Songs";
import './UserProfile.css';

const UserProfile = () => {
    const { id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [type, setType] = useState('Songs');
    const [songActive, setSongActive] = useState(true);
    const [albumActive, setAlbumActive] = useState(false);
    const [playlistActive, setPlaylistActive] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.currentArtistProfile);
    const songs = Object.values(useSelector(state => state.songDetail.userSongs));
    const albums = Object.values(useSelector(state => state.albums.allAlbums)).filter(x => x.userId == id)
    // if (albums.length > 0) {
    //     albums = albums.filter(x => x.userId === user.user.id)
    // }
    const activateSong = () => {
        setSongActive(true)
        setAlbumActive(false)
        setPlaylistActive(false)
        setType('Songs')
    }

    const activateAlbum = () => {
        setSongActive(false)
        setAlbumActive(true)
        setPlaylistActive(false)
        setType('Albums')
    }

    const activatePlaylist = () => {
        setSongActive(false)
        setAlbumActive(false)
        setPlaylistActive(true)
        setType('Playlists')
    }

    useEffect(() => {
        dispatch(getAllAlbums()).then(dispatch(getCurrentArtist(id))).then(() => dispatch(getSongsByUserId(id))).then(() => setIsLoaded(true))
    }, [id])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ECECEC', height: 'auto', width: '100%', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ backgroundColor: 'white', width: '80%', margin: 0, height: 'auto', minHeight: '100vh' }}>
                {isLoaded && <div className="userProfileHeader">
                    <div className="profileUserContainer" >
                        <img className="artistImage" src={user.user.previewImage} alt='Profile Picture' />
                        <div className='artistsHeaderDiv'>
                            <h2 className='artistHeaderUsername'>{user.user.username}</h2>
                            <h3 style={{ marginTop: '10px', fontSize: '16px', color: '#CCCCCC' }} className='artistHeaderUsername' >{user.user.firstName} {user.user.lastName}</h3>
                        </div>
                    </div>
                </div>}
                <div className='optionsDiv'>
                    <div className={songActive ? 'activateFirst' : 'firstOptionsButton'} onClick={() => activateSong()}>Songs</div>
                    <div className={albumActive ? 'activate' : "optionsButton"} onClick={() => activateAlbum()}>Albums</div>
                    <div className={playlistActive ? 'activate' : "optionsButton"} onClick={() => activatePlaylist()}>Playlists</div>
                </div>
                <div className={songs.length >= 3 ? "listForDivs" : 'listForDivsShorter'}>
                    {type === 'Songs' && <div>
                        {isLoaded && songs && songs.map(song => {
                            return <div className="songDetails">
                                <div className="specificSongDiv">
                                    <img className="albumSize" src={song.previewImage} alt='Preview Image' />
                                </div>
                                <div className="songDescription">
                                    <p style={{ fontSize: '12px', color: '#c9c9c9', margin: 0 }}>{user.user.username}</p>
                                    <p style={{ fontSize: '15px' }}>{song.title}</p>
                                    <audio controls>
                                        <source src={song.url} type="audio/ogg" />
                                    </audio>
                                </div>
                            </div>
                        })}
                    </div>}
                    {type === 'Albums' && <div>
                        {isLoaded && albums && albums.map(album => {
                            return <div className="songDetails">
                                <div className="specificSongDiv">
                                    {
                                        album.previewImage.endsWith('.jpg') ?
                                            <img style={{ height: '10em', width: '10em' }} src={album.previewImage} alt={album.description} /> :
                                            <img style={{ height: '10em', width: '10em' }} src='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png' alt={album.description} />
                                    }
                                </div>
                                <div className="songDescription">
                                    <p style={{ fontSize: '12px', color: '#c9c9c9', margin: 0 }}>{user.user.username}</p>
                                    <p style={{ fontSize: '15px' }}>{album.title}</p>
                                    <div style={{ maxHeight: '120px', overflowY: 'scroll' }}>
                                        {album.Songs.map(song => {
                                            return <NavLink style={{ textDecoration: 'none', width: '100%' }} to={`/songs/${song.id}`}>
                                                <p style={{ borderBottom: '2px solid #F2F2F2', color: 'black' }}>{song.title}</p>
                                            </NavLink>
                                        })}
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>}
                    {type === 'Loser' && <h1>Playlists</h1>}
                </div>
            </div>
        </div>
    )
}

export default UserProfile;
