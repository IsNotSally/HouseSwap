import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addMessages, getAllMessages, getChats } from '../apiService';
import Navbar from '../components/Navbar'
import { displayAllMessages, setUserChats } from '../redux/userSlice';
import io from "socket.io-client";
import Conversation from '../components/Conversation';
import Chatbox from '../components/Chatbox';
const socket = io.connect(`http://localhost:3001`)

export default function Inbox() {

  const { chats, userID } = useSelector(store => store.users)
  const [currentChat, setCurrentChat] = useState({})

  const [sendMessage, setSendMessage] = useState({});
  const [receiveMessage, setReceiveMessage] = useState({});

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
  }, [dispatch])


  //send messages to socket server
  useEffect(() => {
    if(sendMessage!==null) {
      socket.emit('send-message', sendMessage)
    }
  }, [sendMessage])
  
  //receive messages from the socket server
 useEffect(()=>{
  socket.on('receive-message', data => {
    setReceiveMessage(data)
  })
 },[])
 
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
              <div className='contact' >
                <Conversation chat={chat} userID={userID} />
                <button onClick={() => {setCurrentChat(chat)}}>Open chat</button>
              </div>
            ))}

          </div>
        </div>

        <div className="chat-container">
        
            <Chatbox userID={userID} currentChat={currentChat} setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}/> 
         
        </div>
      </div>



    </>


  )
}
