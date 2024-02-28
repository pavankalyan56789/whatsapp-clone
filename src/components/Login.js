import React, { useContext } from 'react'
import '../styles/Login.css'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Datacontext } from '../context/Dataprovider';
import { addUser } from '../service/Api.js';




export default function Login() {

  const { setAccount } = useContext(Datacontext);
  const filterUserData = (decoded) => {
    return {
      name : decoded.name,
      email : decoded.email,
      sub : decoded.sub,
      picture : decoded.picture,
    }
  };


  return (
    <div className='login_container'>
        <div className='login_button'>
            <GoogleLogin
                onSuccess={ async (credentialResponse) => {
                // console.log(credentialResponse.credential);

                // // const decoded = jwtDecode(token);
                const decoded = jwtDecode(credentialResponse.credential);
                let filteredUser = filterUserData(decoded);
                console.log(filteredUser);
                setAccount(filteredUser);

                await addUser(filteredUser);
                }}
                onError={() => {
                console.log('Login Failed');
                }}
            />
        </div>
    </div>
  )
}
