import {Auth} from "./components/Auth"
import './App.css';
import { useState, useRef } from 'react';
import Cookies from 'universal-cookie'
import {Chat} from "./components/Chat"
import { signOut} from "firebase/auth"
import {auth} from './firebase-config'
import {Navbar} from "./components/Navbar"
const cookies = new Cookies();


function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null)

  const roomInputRef = useRef(null);

  const signUserOut = async() => {
    await  signOut(auth)
    cookies.remove('auth-token')
    setIsAuth(false)
    setRoom(null)
  }

  if (!isAuth) {

  return (
    <div className="App">
      <Navbar/>
      <Auth setIsAuth={setIsAuth}/>
    </div>
  );
  }

  return (
    <>
      <Navbar/>
      {room ? <Chat room={room}/> : 
      <div className="room">
       <p>WELCOME! <span className="username"></span></p>
       <div className="room-component">
         <input type="text" ref={roomInputRef} placeholder="Enter Room Name"/>
          <button onClick={() => setRoom(roomInputRef.current.value)}>ENTER</button>
       </div>     
      </div>}

      <div className="sign-out">
        <button onClick={signUserOut}>Sign Out</button>
      </div>
      </>
  )
}

export default App;
