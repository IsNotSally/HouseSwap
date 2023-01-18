import React from 'react'
import { useSelector } from 'react-redux'
import House from './House'
import Navbar from './Navbar'

export default function Myaccount() {
  const {houses} = useSelector(store => store.houses)
 const userId = localStorage.getItem('userId')
 const myHouse = houses.filter(house => house.userId === userId)
 console.log(myHouse);
  return (
    <div>
      <Navbar />
      {myHouse.map(house => <House house={house}/>)}
    </div>
  )
}
