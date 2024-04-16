import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ChatBot from "react-chatbotify";
import { RealTimeChatBot } from "./components/RealTimeChatBot";

function App() {
  return (
    <div className="App">
      {/* <ChatBot /> */}

      <RealTimeChatBot />
    </div>
  );
}

export default App;
