import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Discover from '../components/Discover'
import { Link } from 'react-router-dom';
import House from '../components/House';
import Navbar from '../components/Navbar';
import Prompt from '../components/Prompt';
import { getUserHouses } from '../apiService';
import { setUserHouse } from '../redux/userSlice';

export default function Dashboard() {
  const {userID} = useSelector(store=>store.users);
  const { houses } = useSelector(store => store.houses);
  const dispatch = useDispatch()
  //useEffect 
//  useEffect(() => {
//    //fetch user;s houses
//    const getUserHouse = async () => {
//     const res = await getUserHouses(userID);
//     if (houses) {
//       dispatch(setUserHouse(houses))
//     }
//   }
//   getUserHouse()
   
//  }, [dispatch])
 
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

      <Discover />

      <div className='dashboard-list'>
        {
          houses.map(house => <House key={house._id} house={house} setShowPrompt={setShowPrompt}/>)
        }
      </div>
      
      {showPrompt ? <Prompt setShowPrompt={setShowPrompt}/> : ''}

    </div>
  )
}
