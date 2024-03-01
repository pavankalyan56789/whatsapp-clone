import { React, createContext } from "react";
import { useState } from "react";

 
export const Datacontext = createContext(null);



// import React from 'react';

export default function Dataprovider({children}) {

  const [currentchat, setCurrentchat] = useState({});

  const [account, setAccount] = useState(null);


  const[chatlist, setChatlist] = useState([]);

//   const[chatlist, setChatlist] = useState([
//     {
//         name : "Pavan Kalyan",
//         archived : false,
//         pic : "https://mui.com/static/images/avatar/2.jpg",
//         messages : [
//             {
//                 content : "Hi pavan",
//                 time : "4:40 PM",
//                 sent : true
//             },
//             {
//                 content : "Hi, how are you?",
//                 time : "4:41 PM",
//                 sent : false
//             }
//         ]
//     },
//     {
//         name : "Teja Mallela",
//         archived : false,
//         pic : "https://i.pinimg.com/564x/3e/fd/7b/3efd7b3dbe7dbc36b0cd692d21665202.jpg",
//         messages : [
//             {
//                 content : "Hi teja",
//                 time : "4:44 PM",
//                 sent : true
//             },
//             {
//                 content : "Hi, how are you doing?",
//                 time : "4:45 PM",
//                 sent : false
//             }
//         ]
//     }
// ]);

  return (
    <Datacontext.Provider value={{chatlist, setChatlist, currentchat, setCurrentchat, account, setAccount}}>
        {children}
    </Datacontext.Provider>
  )
}


