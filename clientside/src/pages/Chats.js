import React, { useEffect } from "react";
import {useState} from 'react';


import ScrollToBottom from 'react-scroll-to-bottom';


function Chat({socket, username, room}) {

    const [currMessage, setCurrMessage] = useState('');
    const [messageList, setMessageList] = useState([]);


    const sendMessage = async()=>{
        if(currMessage !== ''){
            const messageData = {
                room: room, 
                author: username,
                message: currMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),

            }

            await socket.emit('send_message', messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrMessage('');

        }
    }

    useEffect(()=>{ 
        socket.on('receive_message', (data)=>{
            setMessageList((list) => [...list, data]);

        }
        )
    }, [socket]
    
    );

    return (
        <> 

        {/* <div className="webcam">
        <Webcam width={600} height={500} videoConstraints={videoConstraints} />
        </div> */}

        <div className="chat-window">
        
        <div className="chat-header">
        <p> Chat Now!</p>
        </div>
        <div className="chat-body">
            <ScrollToBottom className="message-container">
            {messageList.map((messageContent) =>{
                return (
                    <div className="message" id={username === messageContent.author ? 'other': 'you'}>
                        <div>
                        <div className="message-content">
                            <p>{messageContent.message}</p>
                            </div>

                            <div className="message-meta">
                                <p id="time">{messageContent.time} </p>
                                <p id="author">{messageContent.author}</p>
                                </div>

</div>
                         </div>
                )

            })}
            </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input type="text" placeholder="heyaa!!" 
            value={currMessage}
            onChange={(e)=>{setCurrMessage(e.target.value)}}
            onKeyPress={(e)=>{e.key === "Enter" && sendMessage();}}/>
            <button onClick={sendMessage}> &#9658; </button>

        </div>
        </div>
        
        </>
    )



}

export default Chat;


