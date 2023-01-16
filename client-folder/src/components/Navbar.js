
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { logout } from '../apiService';
import { setUserLogout } from '../redux/userSlice';
import Login from './Login';
import Signup from './Signup';


export default function Navbar() {

  const { isAuthenticated, userID } = useSelector(store => store.users)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // const {id} = useParams();

  const [showSignupDiv, setShowSignupDiv] = useState(false);
  const [showLoginDiv, setShowLoginDiv] = useState(false);

  //handle logout
  const handleClick = () => {
    logout('accessToken')
    dispatch(setUserLogout())
    navigate(`/`)
  };

  const handleSignupClick = () => {
    setShowSignupDiv(true);
    setShowLoginDiv(false);
  }
  const handleLoginClick = () => {
    setShowSignupDiv(false);
    setShowLoginDiv(true);
  }
  const handleClose = () => {
    setShowSignupDiv(false);
    setShowLoginDiv(false);
  };

  return (
    <nav className='navbar'>
      <div className="nav-left">
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="nav-center">
        <form>
          <input type="text" placeholder="Where do you want to go?" />
          <button type="submit">Search</button>
        </form>
      </div>
      {
        !isAuthenticated
          ?
          <div className="nav-right">
            <button id="sign-in-btn" onClick={handleLoginClick}>Login</button>
            <button id="sign-up-btn" onClick={handleSignupClick}>Sign up for free</button>
          </div>
          :
          <div className="nav-right">
            {/* TODO: here when I click the button multiple times, then it will the same times to go back to the previous page */}
            {/* <button id="sign-in-btn" onClick={()=> navigate(`/dashboard/inbox/${userID}`)}>Message</button> */}
            <button id="sign-up-btn">My account</button>
            <button id='logout-btn' onClick={handleClick}>Logout</button>
          </div>
      }

      {showSignupDiv && <Signup handleClose={handleClose} handleLoginClick={handleLoginClick}/>}

      {showLoginDiv && <Login handleClose={handleClose} handleSignupClick={handleSignupClick}/>}

    </nav>


  )
}
