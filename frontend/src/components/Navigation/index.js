import React from 'react';
import { NavLink } from 'react-router-dom';
import {useSelector} from 'react-redux';
import ProfileButton from './ProfileButton'
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import CreateAccountFormModal from '../CreateAccountModal';


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
