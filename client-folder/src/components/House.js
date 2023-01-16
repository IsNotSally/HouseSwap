import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function House({ house, setShowPrompt }) {
  const { userHouse, isAuthenticated, userID } = useSelector(store => store.users)
  const navigate = useNavigate()

 const handleClick = () => {
  if(!userHouse.length) {
    setShowPrompt(true) 
  } else {
    navigate(`inbox/${userID}`)
  }
 }

  return (
    <div className='card'>
      <Link to={`/${house._id}`}>
        <img src={house.image} alt='Sally house' />
      </Link>

      <div className="card-icon">
        <i className='fa fa-user'></i>
        <p>{house.host_name}'s house</p>
      </div>

      <div className="card-icon">
        <i className='fa fa-map-marker-alt'></i>
        <p>{house.location}</p>
      </div>

      <div className='rating'>
        <i className='fa fa-star'></i>
        <p>4.5</p>
      </div>
    {isAuthenticated ? <button onClick={handleClick}>Contact {house.host_name}</button> : ''}
    </div>

  )
}
