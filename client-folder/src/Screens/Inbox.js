import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllMessages, sendMessages } from '../apiService';
import Navbar from '../components/Navbar'
import { displayAllMessages } from '../redux/userSlice';

export default function Inbox() {

 const {messages} = useSelector(store=>store.users)
 const dispatch = useDispatch();

 //to fetch all the messages from the db
 useEffect(()=>{
  const getMessages = async () => {
    const allmessages = await getAllMessages();
    if (allmessages) {
      dispatch(displayAllMessages(allmessages))
    }
  }
  getMessages()
 },[dispatch])

 const [message, setMessage] = useState('');
 
 const {id} = useParams();

 const handleSubmit = async (e, id, message) => {
    e.preventDefault();
    const res = await sendMessages(id, message)
 }

  return (
    <>
      <Navbar />

      <div className="container">

        <div className='chat-list'>
        </div>

        <div className="chat-container">
          <h1>chat title</h1>
          <div className='messages-container'>

          </div>
          <form id="msg-form" className="input-container" onSubmit={handleSubmit}>
            <input id="text" placeholder="Type a message" value={message} onChange={(e)=> {setMessage(e.target.value)}} />
            <input type="submit" value="SEND" className="send-button"/>
          </form>
        </div>

      </div>

    </>

  )
}
