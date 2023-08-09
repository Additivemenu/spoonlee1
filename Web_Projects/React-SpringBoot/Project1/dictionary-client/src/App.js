import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function App() {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, frame => {
      console.log('Connected: ' + frame);

      stompClient.subscribe('/topic/newword', newWord => {
        setNotification(`New word added by someone: ${newWord.body}`);
      });
    });

    return () => {
      stompClient.disconnect();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/api/dictionary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word, meaning })
    });

    if (response.ok) {
      setWord('');
      setMeaning('');
      setNotification(`You added a new word: ${word}`);
    }
  };

  return (
    <div className="App">
      {notification && <div className="notification">{notification}</div>}

      <form onSubmit={handleSubmit}>
        <input
          value={word}
          onChange={e => setWord(e.target.value)}
          placeholder="Word"
        />
        <input
          value={meaning}
          onChange={e => setMeaning(e.target.value)}
          placeholder="Meaning"
        />
        <button type="submit">Add to Dictionary</button>
      </form>
    </div>
  );
}

export default App;

