import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const Login = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const toast = useToast();
  const history = useHistory();
  const clickHanlder = () => {
    setShow((prev) => !prev);
  };

  const submitHandler = async () => {
    setLoading(true);
    // validate input
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // implement business logic
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      console.log("sending login request")
      const { data } = await axios.post(
        // ! axios login request
        "api/user/login",
        { email, password },
        config
      );

      // popup for sucessful login
      toast({ 
        title: "Login Successful!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // ! local mechanism after successful login
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats"); // ! navigate to "/chats" and push it into history. Note this is React Router V5 feature, not in V6
   
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={clickHanlder}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>

      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest Credentials
      </Button>
    </VStack>
  );
};

export default Login;
