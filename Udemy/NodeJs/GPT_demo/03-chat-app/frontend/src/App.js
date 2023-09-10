import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef();

  useEffect(() => {
    // Connect to the server running on port 8080
    socketRef.current = io('http://localhost:8080');    // return that web socket

    socketRef.current.on('load chat history', (chatHistory) => {
      setMessages(chatHistory);
    });

    socketRef.current.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => socketRef.current.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      socketRef.current.emit('chat message', input);
      setInput('');
    }
  };

  return (
    <div className="chat-container">
    <ul className="chat-messages">
      {messages.map((msg, index) => (
        <li key={index}>{msg}</li>
      ))}
    </ul>

    <form className="chat-form" onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  </div>
  );
}

export default App;
