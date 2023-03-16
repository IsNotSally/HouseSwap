import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAllHouses, getUser } from './apiService';
import Footer from './components/Footer';
import Myaccount from './components/Myaccount';
import Search from './components/Search';
import { setHouses } from './redux/houseSlice';
import { setUserHouse, setUserId, setUserLogin } from './redux/userSlice';
import Dashboard from './Screens/Dashboard';
import Home from './Screens/Home';
import HomeDetail from './Screens/HomeDetail';
import Inbox from './Screens/Inbox';
import Myhome from './Screens/Myhome';

function App() {

  const dispatch = useDispatch();
 const { isAuthenticated} = useSelector(store=>store.users)

  useEffect(() => {
    const getHouses = async () => {
      const allhouses = await getAllHouses();
      if (allhouses) {
        dispatch(setHouses(allhouses))
      }
    }
    getHouses()

    if (localStorage.getItem('accessToken')) {
      dispatch(setUserLogin())
      
    }
  }, [dispatch])


  return (
    <div className="App">
      {/* <Router>
        <Routes>
          <Route path='/' element={ !isAuthenticated ? <Home /> : <Navigate to='/dashboard'/>} />
          <Route path="/dashboard" element={ isAuthenticated ? <Dashboard /> : <Navigate to='/'/>}/>
          <Route path='/dashboard/inbox/:id' element={ isAuthenticated ? <Inbox /> : <Navigate to='/'/>} />
          <Route path="/dashboard/my-home" element={ isAuthenticated ? <Myhome /> : <Navigate to='/'/>} />
          <Route path='/:id' element={ <HomeDetail />} />
          <Route path='/search' element={ <Search /> }/>
          <Route path='/dashboard/:id' element={ <Myaccount /> }/>
        </Routes>
      </Router> */}
      <Footer />
    </div>
  );
}

export default App;
