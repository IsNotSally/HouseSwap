import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createChat, findChat, getChats, getHouseById } from '../apiService';
import { setCurrentChat } from '../redux/userSlice';


export default function House({ house, setShowPrompt }) {
  const userId = localStorage.getItem('userId')
  const dispatch = useDispatch()
  const { userHouse, isAuthenticated, currentChat } = useSelector(store => store.users)
  const navigate = useNavigate()
  const [showbutton, setShowButton] = useState(true)

  const handleClick = async () => {
    if (!userHouse.length) {
      setShowPrompt(true)
    } else {
      const userChat = await findChat(userId, house.userId)
      if (!userChat) {
        const res = await createChat(userId, house.userId)
        dispatch(setCurrentChat(res._id))
      }
      dispatch(setCurrentChat(userChat._id))
      navigate(`inbox/${userId}`)
    }
  }

  //  const myHouse = house.each(house => house.userId === userId)

  return (

    <div className='house-card'>
      <Link to={`/${house?._id}`}>
        <img src={house?.image} alt='house-image' />
       
      </Link>

      <div className="house-card-icon">
        <i className='fa fa-user'></i>
        <p>{house?.host_name}'s house</p>
        {/* <p>{house?.houseTitle}</p> */}
      </div>

      <div className="house-card-icon">
        <i className='fa fa-map-marker-alt'></i>
        <p>{house?.location}</p>
      </div>

      <div className='rating'>
        <i className='fa fa-star'></i>
        <p>4.5</p>
      </div>

      {
        isAuthenticated
          ?
          <div className='btns'>
            {house.userId !== userId
              ?
              <button className='btn' onClick={handleClick}>Contact {house?.host_name}</button>
              :
              <button className='btn'>Edit My house</button>
            }
          </div>
          :
          ''
      }

    </div>

  )
}
