import { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where ,orderBy } from 'firebase/firestore'
import { auth,db } from "../firebase-config"
import '../styles/Chat.css'


export const Chat = (props) => {
    const [newMessage, setNewMessage] = useState("");
    const {room} = props
    const messagesRef = collection(db, 'messages')
    const [messages, setMessages] =useState([])
    useEffect (() => {
        const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt") );

     const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = []
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id})
            })
            setMessages(messages);
        })
        return () => unsuscribe();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "")return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });

        setNewMessage("");
        
    }

    



    return <div className="chat-app">
        <div className="header"> <h1>
         {room.toUpperCase()}</h1></div>

         <div className="messages-container">


         <div className={'messages'}>{messages.map((message) => 
            
            <div className={auth.currentUser.displayName == message.user ? "message" : 'message2'} key={message.id}>
                
            <div className="message-text">
            <span>{message.user.split(' ')[0]}: </span>
                {message.text}
            </div>
            
            {/* {console.log(currentU == message.user)} */}


        </div>)}
        </div>


         </div> 
        <form className="new-message-form" onSubmit={handleSubmit}>
            <input className="new-message-input" placeholder="type your message here" 
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}/>
            <button className="send-button" type="submit">Send</button>
        </form>
        
    </div>

}