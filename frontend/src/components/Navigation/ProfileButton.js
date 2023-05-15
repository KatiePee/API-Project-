
// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import OpenModalMenuItem from './OpenModalMenuItem';
import { Link } from "react-router-dom";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  // const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden") + (!user ? '' : 'profile-dropdown-no-user');
  let ulClassName = (user ? 'profile-dropdown' : 'profile-dropdown-no-user');
  ulClassName += (showMenu ? "" : " hidden")
  return (
    <>
      <button onClick={openMenu} className={showMenu && 'hidden'}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="profile-dropdown-div">
            <li>Hello, {user.username}</li>
            <li className="line">{user.email}</li>
            <li>
              <Link to={{ pathname: '/spots/current', props: user }}>Manage Spots</Link>
            </li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </div>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;