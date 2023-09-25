import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:8080');

function App() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        socket.on('chat message', (msg) => {  // ! I guess this is for receiving the emited message from server
            setChat([...chat, msg]);  // add msg to the end of arr
        });
        return () => socket.off('chat message');
    }, [chat]);  //

    const sendMessage = (e) => { // ! for actively sending message to server
        e.preventDefault();
        if (message) {
            socket.emit('chat message', message); // send message to server and server emit it to all other users
            setMessage('');
        }
    };

    return (
        <div className="App">
            {/* display message list */}
            <ul id="messages">
                {chat.map((msg, idx) => (
                    <li key={idx}>{msg}</li>
                ))}
            </ul>
            {/* post */}
            <form id="form" onSubmit={sendMessage}>
                <input
                    id="input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    autoComplete="off"
                />
                <button>Send</button>
            </form>
        </div>
    );
}

export default App;

