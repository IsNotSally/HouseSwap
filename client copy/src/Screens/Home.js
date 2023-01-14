import React from 'react'
import { useSelector } from 'react-redux'

import Discover from '../components/Discover'
import House from '../components/House'
import Navbar from '../components/Navbar'


export default function Home() {
  const { houses } = useSelector(store => store.houses)

  return (
    <>
      <Navbar />
      <div className='home'>

        <Discover />
        <div className='houses-container'>
          {
            houses.map(house => {
              return <House key={house._id} house={house} />
            })
          }
        </div>
      </div>
      <div className='home-call-to-action'>
        <h2>How does it work?</h2>
        <h3>Start the exchange in 3 steps:</h3>
        <ul>
          <li>Sign up for free</li>
          <li>Complete your profile</li>
          <li>Find your first exchange</li>
        </ul>
      </div>
    </>

  )
}
