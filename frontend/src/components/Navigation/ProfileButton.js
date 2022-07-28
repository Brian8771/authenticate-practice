import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './dropdown.css';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);


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



  // return (
  //   <>
  //     <button  onClick={openMenu}>
  //       <i className="fas fa-user-circle" style={{padding: '2px'}} />
  //       {user.username} ↓
  //     </button>
  //     {showMenu && (
  //       <ul className="profile-dropdown">
  //         <li>{user.username}</li>
  //         <li>{user.email}</li>
  //         <li>
  //           <button  onClick={logout}>Log Out</button>
  //         </li>
  //       </ul>
  //     )}
  //   </>
  // );
    return (
      <div className="dropdown navLink">
      <span style={{color: '#cccccc', padding: '0 6px'}}>
      <i className="fas fa-user-circle" style={{padding: '2px'}} />{user.username} ↓
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
