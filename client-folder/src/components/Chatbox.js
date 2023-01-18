import React, { useEffect, useState } from 'react'
import { addMessages, getAllMessages, getUser } from '../apiService';

export default function Chatbox({ currentChat, userId, setSendMessage, receiveMessage }) {

  const [userData, setUserData] = useState({});
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([]);

  //fetching user data for chat title
  useEffect(() => {
    const anotherUserId = currentChat?.members?.find(id => id !== userId)
    const getUserData = async () => {
      const res = await getUser(anotherUserId)
      setUserData(res)
    }
    getUserData()
  }, [currentChat, userId])

  //fetch all the messages for this chat
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await getAllMessages(currentChat._id)
      setMessages(res)
    }
    fetchMessages()
  }, [currentChat])

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === currentChat._id) {
      setMessages([...messages, receiveMessage])
    }
  }, [receiveMessage])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      senderId: userId,
      text: newMessage,
      chatId: currentChat._id
    }
    //then send message to database
    const res = await addMessages(message)
    setMessages([...messages, res])
    setNewMessage('')

    //send message to socket server
    const receiverId = currentChat.members.find(id => id !== userId)
    setSendMessage({ ...message, receiverId })
  }
  return (

    <div className='outer-container'>
      {
        currentChat
          ?
          <div className='message-box'>
            <div className='chat-title'>
              <p>{userData.name}</p>
            </div>
            <div className='message-container'>
              {messages.map((message) => (
                <div className={message.senderId === userId ? "messages message-right" : "messages message-left"}>
                  <p>{message.text}</p>
                  <p>{message.createAt}</p>
                </div>
              ))}

            </div>
            <div className='form-container'>
              <form id="msg-form" className="input-container" onSubmit={handleSubmit}>
                <input id="text" placeholder="Type a message" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                <input type="submit" value="SEND" className="send-button" />
              </form>
            </div>
          </div>

          :

          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>

      }



    </div>
  )
}
