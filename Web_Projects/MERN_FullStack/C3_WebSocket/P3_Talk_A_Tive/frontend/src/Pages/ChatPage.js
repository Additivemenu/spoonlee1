import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";

import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../Components/miscellaneous/SideDrawer";
import MyChats from "../Components/Chat/MyChats";
import ChatBox from "../Components/Chat/ChatBox";

const ChatPage = () => {
  const { user } = ChatState(); // ! get app-wide context: user logged in state
  const [fetchAgain, setFetchAgain] = useState(false);


  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}

      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        padding="10px"
      >
        {/* state lifting */}
        {user && <MyChats fetchAgain={fetchAgain}/>}
        {/* state lifiting, as user input in ChatBox, influence MyChats */}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />} 
      </Box>
    </div>
  );
};

export default ChatPage;
