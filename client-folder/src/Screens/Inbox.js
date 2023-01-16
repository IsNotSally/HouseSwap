import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllMessages, getChats, sendMessages } from '../apiService';
import Navbar from '../components/Navbar'
import { displayAllMessages, setUserChats } from '../redux/userSlice';
import io from "socket.io-client";
import Conversation from '../components/Conversation';
const socket = io.connect(`http://localhost:3001`)

export default function Inbox() {

  const { chats, userID } = useSelector(store => store.users)

  const dispatch = useDispatch();

  //to fetch all the chats from the db
  useEffect(() => {
    const getChat = async () => {
      const userchat = await getChats(userID);
      if (userchat) {
        dispatch(setUserChats(userchat))
      }
    }
    getChat()

    socket.on('receiveMessage', (data) => {
      // alert(data.message)
    })
  }, [dispatch])

  const [message, setMessage] = useState('');

  const handleSubmit = async (e, id, message) => {
    e.preventDefault();
    socket.emit('sendMessage', { message })
  }

  return (
    <>
      <Navbar />

      <div className="chat">

        <div className='contact-container'>
          <div className='contact-list-title'>Messages</div>
          {/* list of contacts */}
          <div className='contact-list'>
            {/* each contact's div */}
            {chats.map(chat => (
              <div className='contact'>
                <Conversation chat={chat} userID={userID}/> 
              </div>
            ))}

          </div>
        </div>

        <div className="chat-container">
          <div className='chat-title'>owner name</div>
          <div className='messages-container'>
            {/* each message's div */}
            <div className='message'>
              <p className='user-name'>user name// owner name</p>
              <div className='message-text'>

              </div>
            </div>
          </div>
          <form id="msg-form" className="input-container" onSubmit={handleSubmit}>
            <input id="text" placeholder="Type a message" value={message} onChange={(e) => { setMessage(e.target.value) }} />
            <input type="submit" value="SEND" className="send-button" />
          </form>
        </div>

      </div>

    </>

  )
}
