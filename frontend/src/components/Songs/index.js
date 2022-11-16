import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as songActions from '../../store/Songs';
import { Link, NavLink } from 'react-router-dom';
import './Songs.css';
import profile from '../../images/profile.JPG'
import github from '../../images/github.png';
import linkedIn from '../../images/linkedIn.png';


function Songs() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const songs = Object.values(useSelector(state => state.songDetail.songs));
    const albums = Object.values(useSelector(state => state.albums.allAlbums));

    // const buttonLeft = document.getElementById('slideLeft');

    // buttonRight.onclick = function () {
    //     document.getElementById('container').scrollLeft += 20;
    // };
    // buttonLeft.onclick = function () {
    //     document.getElementById('container').scrollLeft -= 20;
    // };

    document.addEventListener('click', function handleClickOutsideBox(event) {
        const buttonScrollRight = document.getElementsByClassName('buttonRight');
        const buttonScrollLeft = document.getElementsByClassName('buttonLeft');
        // console.log(buttonScroll[0].contains(event.target))
        if (buttonScrollRight[0].contains(event.target)) {
            const scroller = document.getElementsByClassName('grid2')
            scroller[0].scrollLeft += 200;

        }
        console.log(buttonScrollLeft[0].contains(event.target))
        if (buttonScrollLeft[0].contains(event.target)) {
            const scroller = document.getElementsByClassName('grid2')
            scroller[0].scrollLeft -= 200;

        }

    });

    useEffect(() => {
        dispatch(songActions.getSongs()).then(dispatch(songActions.getSongsByUser())).then(() =>
            setIsLoaded(true))
    }
        , [dispatch, songs, albums])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ECECEC', height: '100vh', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className='header' style={{ backgroundColor: 'white', width: '80%', margin: 0, paddingTop: '30px', height: '10vh' }}>Songs:</h2>
            <ul className='grid' >
                <div className="innerGrid">
                    {isLoaded && songs && albums &&
                        songs.map(song =>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: '20px' }}>

                                <li className='gridChildren' key={song.id}  >
                                    <Link to={`/songs/${song.id}`}>
                                        {
                                            song.previewImage.endsWith('.jpg') ?
                                                <img style={{ height: '10em', width: '10em' }} src={song.previewImage} alt={song.description} /> :
                                                <img style={{ height: '10em', width: '10em' }} src='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png' alt={song.description} />
                                        }
                                    </Link>
                                    <br />
                                    <NavLink to={`/artists/${song.Artist.id}`} style={{ textDecoration: 'none', display: 'border-box', width: '160px', fontSize: '14px', margin: 0, color: '#c6c6c6' }}>
                                        {song.Artist.username}
                                    </NavLink>
                                    <div style={{ fontWeight: 550, fontSize: '14px' }}>
                                        {song.title}
                                    </div>
                                    <br />
                                </li>
                            </div>
                        )
                    }
                </div>

            </ul>
            <h2 className='header' style={{ backgroundColor: 'white', width: '80%', margin: 0, paddingTop: '0px', height: '10vh' }}>Albums:</h2>
            <ul className='grid2' >
                <div className="innerGrid2">
                    {isLoaded && albums && songs &&
                        albums.map(album =>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: '20px' }}>
                                <li className='gridChildren' key={album.id}  >
                                    <Link to={`/album/${album.id}`}>
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
                    {/* <button className="buttonRight" >
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m8 15-1.062-1.062L10.875 10 6.938 6.062 8 5l5 5Z" /></svg>
                    </button> */}
                    {/* <button className="buttonLeft"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m12 15-5-5 5-5 1.062 1.062L9.125 10l3.937 3.938Z" /></svg></button> */}
                </div>

            </ul>
            <div style={{ position: 'fixed', top: '3em', right: '0' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* <img style={{ height: '20px', width: '20px', borderRadius: '50%' }} src={profile} /> */}
                    <a href='https://github.com/Brian8771'><img style={{ height: '60px', width: '60px' }} src={github} /></a>
                    <a href='https://www.linkedin.com/in/brian-aguilar-088438247/'><img style={{ height: '60px', width: '60px' }} src={linkedIn} /></a>
                </div>
            </div>
        </div>
    )
}

export default Songs;
