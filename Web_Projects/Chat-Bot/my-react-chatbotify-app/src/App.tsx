import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ChatBot from "react-chatbotify";
import { GeminiChatBot } from "./components/GeminiChatBot";
import { OpenAIInjectChatBot } from "./components/OpenAIInjectionChatBot";

function App() {
  return (
    <div className="App">
      {/* <ChatBot /> */}

      {/* <GeminiChatBot /> */}
      
      <OpenAIInjectChatBot />
    </div>
  );
}

export default App;
