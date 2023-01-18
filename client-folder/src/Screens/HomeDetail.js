import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function HomeDetail() {
  const { id } = useParams()
  const userId = localStorage.getItem('userId')
  const { houses } = useSelector(store => store.houses)
  const house = houses.find(house => house._id === id)
  const { userHouse, isAuthenticated } = useSelector(store => store.users)
  const navigate = useNavigate()

  const handleClick = () => {
      navigate(`inbox/${userId}`)
  }

  return (

    <>
      <Navbar />
      <div className="house-detail-page">
        <div className='h-and-d'>
          <div className="house-header">
            <img src={house.image} alt="House Image" />
            <div className="house-header-content">
              <h1>{house.host_name}'s house</h1>
              <div className="house-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
          </div>
          <div className="house-description">
            <p>{house.description}</p>
          </div>
        </div>

        <div className="house-details">
          <div className="detail">
            <h2>Bedrooms</h2>
            <p>{house.bedrooms}</p>
          </div>
          <div className="detail">
            <h2>Bathrooms</h2>
            <p>2</p>
          </div>
          <div className="detail">
            <h2>Guests</h2>
            <p>6</p>
          </div>
          <div className="house-amenities">
            <h2>Amenities</h2>
            <ul>
              <li>
                <i className="fas fa-wifi"></i>
                Wi-Fi
              </li>
              <li>
                <i className="fas fa-utensils"></i>
                Kitchen
              </li>
              <li>
                <i className="fas fa-tv"></i>
                TV
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='dates-av'>
        <h2>Available dates:</h2>
        <h4>{house.startDate}-{house.endDate}</h4>
      </div>
      {!isAuthenticated ? ' ' : <button className='btn' onClick={handleClick}>Contact {house.host_name}</button>}
    </>


  )
}
