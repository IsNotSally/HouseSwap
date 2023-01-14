import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Discover from '../components/Discover'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import House from '../components/House';
import Navbar from '../components/Navbar';
import { getAllHouses } from '../apiService';
import { setHouses } from '../redux/houseSlice';

export default function Dashboard() {
  //useEffect 
  const dispatch = useDispatch()
  const { houses } = useSelector(store => store.houses)
  const { id } = useParams()
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
          houses.map(house => <House key={house._id} house={house} />)
        }
      </div>


    </div>
  )
}
