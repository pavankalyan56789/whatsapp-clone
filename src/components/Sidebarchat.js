import {React, useState, useContext, useEffect} from 'react'
import Sidebar from './Sidebar';

import Avatar from '@mui/material/Avatar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Datacontext } from '../context/Dataprovider';
import { getConversation, setConversation } from '../service/Api';

export default function Sidebarchat({user, index, reveal}) {

    const {chatlist, setChatlist, setCurrentchat, account} = useContext(Datacontext);

    const [currentindex, setcurrentindex] = useState(-1);
    const [currConversation, setCurrConversation] = useState(-1);

    useEffect(()=>{
        const fetchData = async () => {
            let data = await getConversation(
                {
                    senderId: account?.sub, 
                    receiverId: user?.sub
                }
            );
            // console.log(users);
            setCurrConversation(data);
          }
      
          if(account && user) fetchData();
    }, [])

    // console.log(newchatlist);

    //currentindex tells us which chat's dropdown should be shown

    const handleDropdown = (index, event) =>{
        event.stopPropagation();
        if(currentindex==-1)
        {
            //Initially dropdown is not active for any chat
            //When I chick on any chat, that particular chat's dropdown will be activated
            setcurrentindex(index);
        }
        else if(currentindex==index)
        {
            //If we click on the dropdown of the same chat index again, this case will help in disappearing
            //The dropdown of that particular chat
            setcurrentindex(-1);
        }
        else
        { 
            setcurrentindex(index);
        }
    };

    const addConversation = async (user) => {
        setCurrentchat(user);
        //Calling the API so that the conversation will be set between the loggedin user and the current
        //chat person I clicked upon. senderID is my ID
        await setConversation({ senderId: account.sub, receiverId: user.sub });
    }

    const handleArchive = (index, event) => {
        // event.stopPropagation();
        let changedlist = chatlist.map(
            (chat,chatindex) => {
                if(chatindex==index)
                {
                    return {...chat, archived:true};
                }

                return chat; 
            }
        )
        setChatlist(changedlist);
        setcurrentindex(-1);
        //console.log(chatlist);
    }

    const handleUnArchive = (index, event) => {
        // event.stopPropagation();
        let changedlist = chatlist.map(
            (chat,chatindex) => {
                if(chatindex==index)
                {
                    return {...chat, archived:false};
                }

                return chat; 
            }
        )
        setChatlist(changedlist);
        setcurrentindex(-1);
    }
    //console.log(chatlist);
  return (
    <div>
        
                        <div className="sidebar_container" key={index}>
                                <div className='sidebar_chat' onClick={()=>addConversation(user)}>
                                    <Avatar 
                                    className="sidebar_header-avatar"  
                                    src={user?.picture}/>
                                    <div className='sidebar_chat_info'>
                                        <h3>{user?.name}</h3>
                                        {/* <p>{chat.messages[chat.messages.length-1].content}</p> */}
                                        {/* <span> */}
                                            {/* {chat.messages[chat.messages.length-1].time} */}
                                        {/* </span> */}
                                        <KeyboardArrowDownIcon className='down_arrow' 
                                        onClick={(event)=>handleDropdown(index, event)}/>
                                    </div>
                                </div> 
                            <div className="dropdown-content" 
                            style={{display: currentindex==index ? "block" : "none"}}>
                                
                                {
                                    reveal ? (<div className='dropdown_item' 
                                    onClick={(event)=>handleUnArchive(index,event)}>
                                    Unarchive chat</div>) :
                                    (<div className='dropdown_item' 
                                    onClick={(event)=>handleArchive(index,event)}>
                                    Archive chat</div>)

                                }
                                
                                
                                
                                <div className='dropdown_item'>Delete chat</div>
                            </div>
                        </div>
    </div>
  )
}

