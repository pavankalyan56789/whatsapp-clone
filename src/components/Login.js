import React, { useContext } from 'react'
import '../styles/Login.css'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Datacontext } from '../context/Dataprovider';



export default function Login() {

  const { setAccount } = useContext(Datacontext);


  return (
    <div className='login_container'>
        <div className='login_button'>
            <GoogleLogin
                onSuccess={credentialResponse => {
                // console.log(credentialResponse.credential);

                // // const decoded = jwtDecode(token);
                const decoded = jwtDecode(credentialResponse.credential);
                console.log(decoded);
                setAccount(decoded);
                }}
                onError={() => {
                console.log('Login Failed');
                }}
            />
        </div>
    </div>
  )
}
