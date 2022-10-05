import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './dropdown.css';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };


    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };



  return (
    <div style={{ width: '8rem', display: 'flex', justifyContent: 'center' }} >
      <button onClick={openMenu} style={{ height: '100%', backgroundColor: 'transparent', border: 'none', color: '#CCCCCC', fontSize: '16px', display: 'flex', alignItems: 'center' }}>
        <img src={user.previewImage} style={{ padding: '2px', height: '16px', width: '16px', borderRadius: '50%' }} />
        {user.username} ↓
      </button>
      {showMenu && (
        <div style={{ position: 'absolute', top: '44px', backgroundColor: 'white', border: '1px solid black', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '8rem', padding: '10px 0' }} className="profile-dropdown">
          <NavLink to={`/artists/${user.id}`} style={{ textDecoration: 'none', color: 'black', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
            <img src={user.previewImage} style={{ padding: '2px', height: '16px', width: '16px', borderRadius: '50%' }} />Profile</NavLink>
          <div style={{ textDecoration: 'none' }}>{user.email}</div>
          <div style={{ textDecoration: 'none' }}>
            <button onClick={logout}>Log Out</button>
          </div>
        </div>
      )}
    </div>
  );
  return (
    <div className="dropdown navLink">
      <span style={{ color: '#cccccc', padding: '0 6px' }}>
        <i className="fas fa-user-circle" style={{ padding: '2px' }} />{user.username} ↓
      </span>
      <div className="dropdown-content">
        <p>{user.username}</p>
        <p>{user.email}</p>
        <button className="logOutButton" onClick={logout}>Log Out</button>
      </div>
    </div>
  )
}

export default ProfileButton;
