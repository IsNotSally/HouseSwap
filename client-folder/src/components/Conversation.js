import React, { useEffect, useState } from 'react'
import { getUser } from '../apiService';

export default function Conversation({ chat, userID }) {

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const anotherUserId = chat.members.find(id => id !== userID)
    const getUserData = async () => {
      const res = await getUser(anotherUserId)
      setUserData(res)
    }
    getUserData()
  }, [userID])

  return (
    <p>{userData.name}</p>
  )
}
