import React, { useEffect, useState } from 'react'
import { getUser } from '../apiService';

export default function Conversation({ chat, userId }) {

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const anotherUserId = chat.members.find(id => id !== userId)
    const getUserData = async () => {
      const res = await getUser(anotherUserId)
      setUserData(res)
    }
    getUserData()
  }, [userId])

  return (
    <div className='contact-name'>
      <p>{userData.name}</p>
    </div>



  )
}
