import React, { useState, useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

function App() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new ReconnectingWebSocket('ws://localhost:8080');
    setWs(socket);

    socket.addEventListener('message', (event) => {
      setChatLog((prev) => [...prev, event.data]);
    });

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws) {
      ws.send(message);
      // Add the sent message to chat log.
      setChatLog((prev) => [...prev, `You: ${message}`]);
      setMessage('');
    }
  };

  return (
    <div className="App">
      {/* display */}
      <div className="chatWindow">
        {chatLog.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      
      {/* display */}
      <div className="chatInput">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;

