import React, { useState, useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

function App() {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new ReconnectingWebSocket('ws://localhost:8080');
    setWs(socket);

    socket.addEventListener('message', (event) => {
      setReceivedMessages((prev) => [...prev, event.data]);
    });

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws) {
      ws.send(message);
      setMessage('');
    }
  };

  return (
    <div className="App">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>

      <ul>
        {receivedMessages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
