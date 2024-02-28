import React, {useContext, useEffect, useState} from 'react'
import '../styles/Sidebar.css'

import BorderColorIcon from '@mui/icons-material/BorderColor';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Sidebarchat from './Sidebarchat';
import { Datacontext } from '../context/Dataprovider';



export default function Sidebar() {

    
    const {account, chatlist} = useContext(Datacontext);
    
    const[reveal, setReveal] = useState(false);
    
    const [searchvalue, setSearchvalue] = useState("");

    const[newchatlist, setNewchatlist] = useState(chatlist);
    
    useEffect(()=> {
        setNewchatlist(chatlist)
    }, [chatlist]);

    const handleArchived = () => {
        //As soon as I call this function, I am changing the reveal variable to true,due to which
        //width will be 100% in the style of sidebar_archived_section and hence the box will be visible
        setReveal(!reveal);
    }


    const handlechange = (e) => {
        setSearchvalue(e.target.value);
        let newlist = chatlist.filter(
            (chat) => chat.name.toLowerCase().indexOf(e.target.value.toLowerCase())>=0);

        setNewchatlist(newlist);
    }


    const getNoofArchivedChats = () =>{
        //The below number counts the number of archived chats
        let number =0;
        chatlist.map(
            (chat,index) => {
                if(chat.archived == true)
                {
                    number = number + 1;
                }
            }
        )

        return number;
    }

  return (
    <div className='Sidebar'>
        <div className="sidebar_header">   
            <Avatar className="sidebar_header-avatar"  src={account?.picture}/>
            <p className='sidebar_header_name'>{account?.name.split(" ")[0]}</p>
            <BorderColorIcon className='sidebar_icons edit'/>
            <MoreHorizIcon className='sidebar_icons more'/>
        </div>

        <div className='sidebar_search'>
            <input placeholder='Search or start a new chat' 
            value={searchvalue} onChange={(e) => handlechange(e)}>

            </input>
            <SearchIcon/>
        </div>
        
        <div className='sidebar_archived' onClick = {handleArchived}>
            <BusinessCenterOutlinedIcon className='archived'/>
            Archived
            <div className='archived_number'>{getNoofArchivedChats()}</div>
        </div>

        <div className='sidebar_archived_section' style={{
            marginLeft : reveal ? "0%" : "-140%",
            opacity: reveal ? "1": "0"}}>
            <div className='sidebar_archived_section_header'>
                <ArrowBackIcon onClick={handleArchived} className='back'/>
                <p>
                    Archived    
                </p>
            </div>

            <Sidebarchat newchatlist={newchatlist} reveal = {reveal}/>
        </div>

        <div className='sidebar_chat_list'>
            {/* We are sending chatlist data from the Sidebar() component to it's child component which icons
            Sidebarchat using props using the syntax below */}
            <Sidebarchat newchatlist={newchatlist} reveal = {reveal}/>
        </div>
    </div>
  )
}
