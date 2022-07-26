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
            <div className='divForLi'>
            <li className='liNav'>
            <LoginFormModal />
            </li>
            </div>
            <div className='divForLi'>
            <li className='liNav'>
            <NavLink className='navLinks' style={{backgroundColor: '#FF5500', color: '#FFFFFF', textDecoration: 'none', fontSize: '14px', padding: '4px 10px', borderRadius: '2px'}} to='/signup'>Create Account</NavLink>
            </li>
            </div>
            </>
        );
    }



    return (

        <ul className='nav' style={{backgroundColor: "#333", margin: '0'}}>
            <div className='divForLi'>
                <img style={{height: '50px', width: '100px'}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL6R_9ciZNddGn5DVMhzDPu_AIUTkeOHHfgw&usqp=CAU' alt='soundCloud'/>
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
