import { useContext } from 'react';
import './App.css';
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Datacontext } from './context/Dataprovider';
import Login from './components/Login';



function App() {
  const {account} = useContext(Datacontext);

  const Sidebar_and_chat = () => {
    return (
      <>
        <Sidebar/>
        <Chat/>
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
