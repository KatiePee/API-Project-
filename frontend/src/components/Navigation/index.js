// import React from "react";
// import { NavLink, Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import ProfileButton from "./ProfileButton";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
// import "./Navigation.css";

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector((state) => state.session.user);

//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//       <li className='nav-links'>
//         <Link to='/spots/new'>
//           <button>Create a new spot!</button>
//         </Link>
//         <ProfileButton user={sessionUser} />
//       </li>
//     );
//   } else {
//     sessionLinks = (
//       <li className='nav-links'>
//         <OpenModalButton
//           buttonText="Log In"
//           modalComponent={<LoginFormModal />}
//         />
//         <OpenModalButton
//           buttonText="Sign Up"
//           modalComponent={<SignupFormModal />}
//         />
//       </li>
//     );
//   }

//   return (
//     <ul className='nav-bar'>
// <li className='nav-logo'>
//   <NavLink exact to="/">
//     <i class="fa-brands fa-airbnb"></i> spotbnb
//   </NavLink>
// </li>
//       {isLoaded && sessionLinks}
//     </ul>
//   );
// }

// export default Navigation;



// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='nav-bar'>
      <li className='nav-logo'>
        <NavLink exact to="/">
          <i class="fa-brands fa-airbnb"></i> spotbnb
        </NavLink>
      </li>
      {isLoaded && (
        <li>

          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;