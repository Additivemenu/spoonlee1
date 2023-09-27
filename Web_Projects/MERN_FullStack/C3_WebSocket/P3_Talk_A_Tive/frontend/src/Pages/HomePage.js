import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Container,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../Components/Auth/Login";
import Signup from "../Components/Auth/Signup";

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    // check local storage, keep user login state
    const user = JSON.parse(localStorage.getItem("userInfo"));

    console.log("in home page, geting user logged in state");
    
    if (user) {
      console.log(`${user.name} has logged in, now directly to chat page`)
      history.push("/chats");
    }
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="4xl"
          fontFamily="Work sans"
          color="black"
          textAlign="center"
        >
          Talk-A-Tive
        </Text>
      </Box>
      <Box
        bg="white"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        color="black"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
