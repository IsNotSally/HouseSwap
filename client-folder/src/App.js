import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path='/dashboard/:id/inbox' element={<Inbox />} />
          <Route path="/dashboard/:id/my-home" element={<Myhome />} />
        </Routes>
      </Router>
      <Footer />
      <div>hi</div>
      <div></div>
    </div>
  );
}

export default App;
