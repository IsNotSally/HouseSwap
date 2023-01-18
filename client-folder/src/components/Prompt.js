import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Prompt({setShowPrompt}) {
  const navigate = useNavigate();
 
  const handleClose=() => {
    setShowPrompt(false)
  }

  return (
    <div className="modal" id="login-modal">
      <div className="card">
        <button onClick={handleClose} className="close-button">X</button>
        <h2>You need to create a house to contact the other owners!</h2>
        <button className='create-btn' type="submit" onClick={()=> navigate('my-home')}>Create my first House!</button>
      </div>
    </div>
  )
}
