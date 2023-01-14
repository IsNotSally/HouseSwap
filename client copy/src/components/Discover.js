import React from 'react'

export default function Discover() {
  return (
    <div className='discover'>
      <form>
        <label>Explore the house around the world:</label>
        <input type="search" placeholder="Where do you want to go?" />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}
