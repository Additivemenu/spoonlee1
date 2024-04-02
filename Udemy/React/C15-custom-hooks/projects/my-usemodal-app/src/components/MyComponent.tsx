import React from "react";
import { Button } from "@mui/material";
import useToast from "../hooks/useToast";

const MyComponent = () => {
  const { openToast, ToastModal } = useToast(2000);

  const handleClick = () => {
    openToast({ toastMessage: "Hello, World!", toastPosition: "bottom-right" });
  };

  return (
    <div>
      <Button onClick={handleClick}>Show Toast</Button>
      <ToastModal />
    </div>
  );
};

export default MyComponent;
