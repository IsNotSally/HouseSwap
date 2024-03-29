import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Discover from '../components/Discover'
import { Link, Outlet } from 'react-router-dom';
import House from '../components/House';
import Navbar from '../components/Navbar';
import Prompt from '../components/Prompt';
import { getUser, getUserHouses } from '../apiService';
import { setUserHouse, setUserLogin } from '../redux/userSlice';


export default function Dashboard() {
  // const {userHouse} = useSelector(store=>store.users);
  const { houses } = useSelector(store => store.houses);
  const dispatch = useDispatch()

  useEffect(() => {
    //fetch user'houses
    const userId = localStorage.getItem('userId')
    const getUserHouse = async () => {
      const res = await getUserHouses(userId);
      dispatch(setUserHouse(res))
    }
    getUserHouse()
  }, [dispatch])


  const [showPrompt, setShowPrompt] = useState(false)

  return (
    <div className='dashboard'>
      <Navbar />
      <div className='call-to-action'>
        <h1>Ready to exchange? <br /> Create your house!</h1>
        <Link to={`my-home`}>
          <button>Create my house</button>
        </Link>
      </div>
      
      {/* <Discover /> */}

      <div className='dashboard-list'>
        {
          houses.map(house => <House key={house._id} house={house} setShowPrompt={setShowPrompt} />)
        }
      </div>

      {showPrompt ? <Prompt setShowPrompt={setShowPrompt} /> : ''}
      <Outlet />
    </div>
  )
}
