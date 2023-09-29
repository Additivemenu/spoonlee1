import React, { useEffect, useState } from "react";
import "./style.css";
import { ChatState } from "../../Context/ChatProvider";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon, SpinnerIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";

import ProfileModal from "../miscellaneous/ProfileModal";
import UpdateGroupChatModal from "../miscellaneous/UpdateGroupChatModal";
import ScrollableChat from "./ScrollableChat";
import axios from "axios";

// socket io ============================ //
import io from "socket.io-client";
const ENDPOINT = "http://localhost:8081";
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [socketConnected, setSocketConnected] = useState(false);

  const toast = useToast();

  const { user, selectedChat, setSelectedChat } = ChatState();

  //! socket io ================================================================ //
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user); // emit logged-in user to socket io server
    socket.on("connected", () => setSocketConnected(true));

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);
  // ! ========================================================================== //

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );

      console.log(`fetched all messages from chat ${selectedChat._id}:`);
      console.log(data);

      setMessages(data);
      setLoading(false);
      //! socket io: user join a chat ================================================================ //
      socket.emit("join chat", selectedChat._id); // ! logged-in user join the chat room
      // ! ========================================================================== //
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to load the message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  // ! use efefct to fetch messages when selectedChat changed
  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat; // note selectedChatCompare is not react state
    console.log("selected chat compare is: ");
    console.log(selectedChatCompare);
  }, [selectedChat]); // make sure when selectedChat changed, messages displayed on screen also change

  // ! socket io: receive new message from other users to achieve real-time chat
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // FIXME: no chat selected or not the chat that i am currently selected, so give notification
      } else {
        // the chat that i am currently selected, so update the messages
        console.log(
          `new message received from server, now update the messages...`
        );
        console.log(newMessageReceived);
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  // ========================================================================== //
  const sendMessageHandler = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage(""); // ! note newMessage is not instantly made ""

        const { data } = await axios.post(
          // ! axios post
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        console.log("message sent: ");
        console.log(data);

        // ! socket io: send new message to server ===================================================== //
        socket.emit("new message", data);
        // ! ========================================================================== //

        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  // ========================================================================== //
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    // Typing Indicator Logic
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    // set timer to stop typing
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          {/* chat box title title ==================================================*/}
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            width="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />

            {!selectedChat.isGroupChat ? (
              // not group chat -----------------------------
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              // group chat ----------------------------------
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          {/* chat box body ========================================================= */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            width="100%"
            height="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl onKeyDown={sendMessageHandler} isRequired mt={3}>
              {isTyping ? (
                <div>
                  opponent is typing...
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message..."
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
