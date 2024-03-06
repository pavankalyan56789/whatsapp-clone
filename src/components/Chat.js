import React, { useEffect, useState, useContext } from 'react'
import '../styles/Chat.css'

import Avatar from '@mui/material/Avatar';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import SearchIcon from '@mui/icons-material/Search';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useParams } from 'react-router-dom';
import { Datacontext } from '../context/Dataprovider';


export default function Chat() {

  const {chatlist, currentchat} = useContext(Datacontext);
  const [messageInput, setMessageInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("message sent");
  };



  return (
    <div className='Chat'>
      <div className='chat_header'>
        <Avatar className="chat_header-avatar"  src={currentchat.picture}/>
        <div className='chat_name'>
          <h3>{currentchat.name}</h3>
          <p>online</p>
        </div>
        <CallOutlinedIcon className='phone'/>
        <VideocamOutlinedIcon className='video'/>
        <SearchIcon className='search'/>
      </div>

      <div className='chat_body'>

        {currentchat?.messages?.map(
          (message,index) => {
            return (
              <div className={message.sent ? "chat_message chat_sent": "chat_message"} key={index}>
                {message.content}
                <span>{message.time}</span>
              </div>
            )
          }
        )} 
        
      </div>

      <div className='chat_footer'>
        <EmojiEmotionsOutlinedIcon/>
        <AttachFileOutlinedIcon/>
        <form onSubmit={(e)=>sendMessage(e)}>
          <input value={messageInput} 
          onChange={(e)=>setMessageInput(e.target.value)}
          placeholder='Type a message'></input>
        </form>
        <SendOutlinedIcon/>
      </div>
    </div>
  )
}
