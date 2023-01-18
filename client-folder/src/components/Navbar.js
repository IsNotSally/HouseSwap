import logo from '../assets/logo.png'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, Link, useNavigate, useParams } from 'react-router-dom';
import { logout } from '../apiService';
import { setUserLogout } from '../redux/userSlice';
import Login from './Login';
import Signup from './Signup';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

export default function Navbar() {
  const userId = localStorage.getItem('userId')
  const { isAuthenticated } = useSelector(store => store.users)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  //search bar settings 
  const [searchInput, setSearchInput] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }

  //login and sign up popovers
  const [showSignupDiv, setShowSignupDiv] = useState(false);
  const [showLoginDiv, setShowLoginDiv] = useState(false);
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

  //handle search
  const handleSearch = (e) => {
    e.preventDefault();
    navigate({
      pathname: "/search",
      search: `?${createSearchParams({
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      })}`
    });
  }

  //handle logout
  const handleClick = () => {
    logout('accessToken')
    dispatch(setUserLogout())
    navigate(`/`)
  };


  return (
    <>

      <nav className='navbar'>

        <div className="nav-left">
          <Link to={'/dashboard'}>
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <div className="nav-center">

          <input type="text" placeholder="Where do you want to go?" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          <button type="submit" onClick={handleSearch}>Search</button>

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
              <button id="sign-up-btn" onClick={() => navigate(`/dashboard/${userId}`)}>My account</button>
              <button id="sign-up-btn" onClick={() => navigate(`/dashboard/inbox/${userId}`)}>Message</button>
              <button id='logout-btn' onClick={handleClick}>Logout</button>
            </div>
        }

        {showSignupDiv && <Signup handleClose={handleClose} handleLoginClick={handleLoginClick} />}

        {showLoginDiv && <Login handleClose={handleClose} handleSignupClick={handleSignupClick} />}

      </nav>
      {searchInput &&
        <div className='searchbar'>
          <div className='date-range'>
            <DateRangePicker ranges={[selectionRange]} minDate={new Date()} onChange={handleSelect} />
          </div>
          <div className='button-group'>
            <button onClick={() => setSearchInput('')}>Cancel</button>
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      }
  </>
  )
}
