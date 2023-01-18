import React from 'react'
import { useSearchParams } from 'react-router-dom';
import Navbar from './Navbar'
import {format} from 'date-fns'
import { useSelector } from 'react-redux';
import House from './House';

export default function Search() {
  const {houses} = useSelector(store=> store.houses)
  const [searchParams] = useSearchParams();
 const startDate = searchParams.get('startDate'); 
 const endDate = searchParams.get('endDate'); 
 const location = searchParams.get('location'); 
 const formatStartDate = format(new Date(startDate), 'dd MMMM yyyy')
 const formatEndDate = format(new Date(endDate), 'dd MMMM yyyy')
const range = `${formatStartDate} - ${formatEndDate}`
 
const filteredByLocation = houses.filter(house => {
  if(house) return house.location.toLowerCase().includes(location.toLowerCase());
});

  return (
    <div className='search-page'>
      <Navbar />
      <p>{range}</p>
      <h2>Houses in {location}</h2>
      <div className='filter-container'>
         { filteredByLocation?.map(house => <House key={house._id} house={house}/> )}
      </div>
      
    </div>
  )
}
