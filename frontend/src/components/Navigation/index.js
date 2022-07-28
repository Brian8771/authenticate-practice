import React, {useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux';
import ProfileButton from './ProfileButton'
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import CreateAccountFormModal from '../CreateAccountModal';


function Navigation({isLoaded}) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    const songs = Object.values(useSelector(state => state.songDetail.songs));
    const [search, setSearch] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        for (let song of songs) {
            if (song.title === search) {
                setSearch('');
                return history.push(`/songs/${song.id}`)
            }
        }
    }

    let sessionLinks;


    if (sessionUser) {
        sessionLinks =
        <ProfileButton user={sessionUser} className='navLinks'/>
    }
    else {
        sessionLinks = (
            <>
            <div className='divForLi'>
            <li className='liNav'>
            <LoginFormModal />
            </li>
            </div>
            <div className='divForLi'>
            <li className='liNav'>
            <CreateAccountFormModal className='navLinks' style={{backgroundColor: '#FF5500', color: '#FFFFFF', textDecoration: 'none', fontSize: '14px', padding: '4px 10px', borderRadius: '2px'}} to='/signup'>Create Account</CreateAccountFormModal>
            </li>
            </div>
            </>
        );
    }



    return (

        <ul className='nav' style={{backgroundColor: "#333", margin: '0'}}>
            <div style={{display: 'flex', backgroundColor: 'black', width: '80px', justifyContent: 'right', alignItems: 'center'}}>
                <img style={{height: '25px', width: '100px'}} src='https://a-v2.sndcdn.com/assets/images/peace-cloud-28ad0963.svg' alt='soundCloud'/>
            </div>
            <div  style={{display: 'flex', backgroundColor: 'black', width: '110px', justifyContent: 'left', alignItems: 'center'}}>
                <img style={{height: '25px', width: '100px'}} src='https://a-v2.sndcdn.com/assets/images/wordmark@2x-8fdb346f.png' alt='soundCloud'/>
            </div>
            <div className='divForLi'>
            <li className='liNav' style={{listStyle: 'none'}}>
                <NavLink style={{color: '#CCCCCC',textDecoration: 'none', fontSize: '14px', fontFamily: 'Interstate,Lucida Grande,Arial,sans-serif'}} className='navLinks' exact to='/'>Home</NavLink>
            </li>
            </div>
            <div className='divForLi'>
            <li className='liNav' style={{listStyle: 'none'}}>
              <NavLink to='/songs/user' style={{color: '#CCCCCC',textDecoration: 'none', fontSize: '14px', fontFamily: 'Interstate,Lucida Grande,Arial,sans-serif'}} className='navLinks'>My Songs</NavLink>
            </li>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <form className='searchForm' onSubmit={handleSubmit}>
                    <input
                    placeholder='Search for song by name'
                    className='searchInput'
                    name='searchBar'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className='searchButton' type='submit'>Submit</button>
                </form>
            </div>
                {isLoaded && sessionLinks}
            <div className='divForLi'>
            <li className='liNav' style={{listStyle: 'none'}}>
                <NavLink style={{color: '#CCCCCC',textDecoration: 'none', fontSize: '14px', fontFamily: 'Interstate,Lucida Grande,Arial,sans-serif'}} className='navLinks' to='/songs/create'>Upload</NavLink>
            </li>

            </div>
        </ul>

    );
}

export default Navigation
