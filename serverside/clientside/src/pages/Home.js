import "./App.css";
import { useState } from "react";
import React  from "react";
import io from "socket.io-client";
import Chat from "./Chats";
import Navbar from '../comp/Navbar'
import { Link } from 'react-router-dom';
import iiitb from './iiitb.png'



const socket = io.connect("http://localhost:3001");


function Home() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

 



  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <>
    <div className="App">
      <h1> IIITB GupShup </h1>
      {!showChat ? (
        <div className="joinChatContainer">
          <h3> Chat with your batchmates !!</h3>
          <img src={iiitb} />

          <Navbar />


{/*         
          <Link tp="/about" element={About}> About </Link> */}
          {/* <Navbar /> */}
         
          <input
            type="text"
            placeholder="Your Name"
            onChange={(e) => {
              setUsername(e.target.value);  
            }}
          />

          <input
            type="text"
            placeholder="Room ID"
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            onKeyPress={(e) => {
              e.key === "Enter" && joinRoom();
            }}
          />

          <button onClick={joinRoom}>Join a Room </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
    </>
  );
}

export default Home;
