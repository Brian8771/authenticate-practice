import React from 'react';
import { NavLink } from 'react-router-dom';
import {useSelector} from 'react-redux';
import ProfileButton from './ProfileButton'
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({isLoaded}) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;

    if (sessionUser) {
        sessionLinks =
        <ProfileButton user={sessionUser} className='navLinks'/>
    }
    else {
        sessionLinks = (
            <>
            <LoginFormModal className='navLinks'/>
            <NavLink className='navLinks' style={{backgroundColor: '#FF5500', color: '#FFFFFF', textDecoration: 'none'}} to='/signup'>Create Account</NavLink>
            </>
        );
    }



    return (

        <ul className='nav' style={{backgroundColor: "#333", margin: '0'}}>
            <li className='liNav' style={{listStyle: 'none'}}>
                <NavLink style={{color: '#CCCCCC',textDecoration: 'none', fontSize: '14px', fontFamily: 'Interstate,Lucida Grande,Arial,sans-serif'}} className='navLinks' exact to='/'>Home</NavLink>
                {isLoaded && sessionLinks}
            </li>
            <li className='liNav' style={{listStyle: 'none'}}>
                <NavLink style={{color: '#CCCCCC',textDecoration: 'none', position: 'relative', top: '10px', fontSize: '14px', fontFamily: 'Interstate,Lucida Grande,Arial,sans-serif'}} className='navLinks' to='/songs/create'>Upload</NavLink>
            </li>
        </ul>

    );
}

export default Navigation
