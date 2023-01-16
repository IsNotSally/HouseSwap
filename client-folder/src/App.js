import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAllHouses } from './apiService';
import Footer from './components/Footer';
import { setHouses } from './redux/houseSlice';
import { setUserLogin } from './redux/userSlice';
import Dashboard from './Screens/Dashboard';
import Home from './Screens/Home';
import Inbox from './Screens/Inbox';
import Myhome from './Screens/Myhome';

function App() {

  const dispatch = useDispatch();
 const {isAuthenticated} = useSelector(store=>store.users)

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

  //TODO: each route should have a similar check like line 40
  return (
    <div className="App">
      <Router>
        <Routes>
        {/* <Route path='/' element={  <Home /> } /> */}
        {/* TODO: this line is redirecting but the id is not showing */}
          <Route path='/' element={ !isAuthenticated ? <Home /> : <Navigate to='/dashboard'/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/dashboard/:id" element={<Dashboard />} /> */}
          <Route path='/dashboard/inbox/:id' element={<Inbox />} />
          <Route path="/dashboard/my-home" element={<Myhome />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
