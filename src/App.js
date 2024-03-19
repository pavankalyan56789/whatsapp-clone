import { useContext, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Datacontext } from './context/Dataprovider';
import Login from './components/Login';
import { getUser } from './service/Api';
import defaultImage from '../src/images/default_whatsapp.PNG'



function App() {
  const {account, setChatlist, currentchat} = useContext(Datacontext);
  
  useEffect( () => {
    
    const fetchData = async () => {
      let users = await getUser();
      // console.log(users);
      setChatlist(users);
    }

    fetchData();
  }, []);

  const Sidebar_and_chat = () => {
    return (
      <>
        <Sidebar/>
        {currentchat ? <Chat/> : <img src={defaultImage} className='defaultImage'/>}
      </>
    );
  }

  return (
    <GoogleOAuthProvider clientId="904572091174-i12m156rlu577cp9gtenvl041pneph32.apps.googleusercontent.com">
      <div className="App">
        <div className="chat_container">
          {
            account ? <Sidebar_and_chat/> : <Login/>
          }

        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
