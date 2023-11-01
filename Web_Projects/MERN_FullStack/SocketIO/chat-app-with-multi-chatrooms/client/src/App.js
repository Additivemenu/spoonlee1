import React, { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("Room1"); // default room
  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  const [timer, setTimer] = useState(null);

  useEffect(() => {
    socket = io.connect("http://localhost:3000");

    socket.on("message", (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    // ! Handle the chat history when received from server
    socket.on("chatHistory", (history) => {
      setChat(history);
    });

    // ! Handle updated list of users in the room
    socket.on("roomUsers", (users) => {
      console.log("received updated user list");
      setActiveUsers(users);
    });

    // ! capture countdown number broadcasted from server
    socket.on("countdown", (timeLeft) => {
      setTimer(timeLeft);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log("active users: ", activeUsers);
  }, [activeUsers]);

  const onTextChange = (e) => {
    setMessage(e.target.value);
  };

  const onMessageSend = () => {
    if (message !== "") {
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  const onJoinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("joinRoom", { name, room });
      setChat([]); // Clear previous chat messages
    }
  };

  return (
    <div>
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <select value={room} onChange={(e) => setRoom(e.target.value)}>
          <option value="Room1">Room1</option>
          <option value="Room2">Room2</option>
          <option value="Room3">Room3</option>
          <option value="Room4">Room4</option>
        </select>
        <button onClick={onJoinRoom}>Join Room</button>
      </div>

      <div>
        {chat.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.user}: </strong> {msg.text}
          </div>
        ))}
      </div>

      <div>
        <input
          value={message}
          onChange={onTextChange}
          placeholder="Enter message"
        />
        <button onClick={onMessageSend}>Send</button>
      </div>

      <div>
        <strong>Active Users:</strong>
        <ul>
          {activeUsers.map((user) => (
            <li key={user}>{user}</li>
          ))}
        </ul>
      </div>
      {timer !== null && <div>Time left: {timer} seconds</div>}
    </div>
  );
}

export default App;
