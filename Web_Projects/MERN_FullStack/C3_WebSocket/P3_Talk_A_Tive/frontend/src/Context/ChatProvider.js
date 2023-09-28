import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext({ user: null, setUser: () => {} });

// user logged in state should be app-wide available
const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();   // logged in user
  const [selectedChat, setSelectedChat] = useState();   // the current chat user selected
  const [chats, setChats] = useState([]);   // all chats that logged in user get involved 

  const history = useHistory();

  // ! note since ChatProvider is wrapper around <App/>, the call back in useEffect() will firstly run as npm start
  // ! but shouldn't that have a circular dependency? 
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")); // ! note JSON parse string to object, localStorage has been set after user login 
    setUser(userInfo);

    if (!userInfo) {
      console.log("in chat provider, no user is logged in!")
      // history.push("/");  // ! go back to home page if no user is loggedin  ! circular dependency? which useEffect run first? this one or the one in HomePage.js
    }
  }, [history]);

  return (
    // bound context(state + setState) to context provider
    <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>
      {children}
    </ChatContext.Provider>
  );
};

// just make context app-wide available
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
