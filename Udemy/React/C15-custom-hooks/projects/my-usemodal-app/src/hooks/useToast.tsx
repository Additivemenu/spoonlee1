import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, PaperProps } from "@mui/material";

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

const useToast = (duration = 3000) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [toastPosition, setToastPosition] =
    useState<ToastPosition>("top-right");

  const openToast = ({
    toastMessage,
    toastPosition,
  }: {
    toastMessage: string;
    toastPosition: ToastPosition;
  }) => {
    setMessage(toastMessage);
    setIsOpen(true);
    setToastPosition(toastPosition);
  };

  const closeToast = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        closeToast();
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen, duration]);

  const getPositionStyles = (): PaperProps["sx"] => {
    switch (toastPosition) {
      case "top-left":
        return { top: 16, left: 16 };
      case "top-center":
        return { top: 16, left: "50%", transform: "translateX(-50%)" };
      case "top-right":
        return { top: 16, right: 16 };
      case "bottom-left":
        return { bottom: 16, left: 16 };
      case "bottom-center":
        return { bottom: 16, left: "50%", transform: "translateX(-50%)" };
      case "bottom-right":
        return { bottom: 16, right: 16 };
      default:
        return { top: 16, right: 16 };
    }
  };

  const ToastModal = () => (
    <Dialog
      open={isOpen}
      onClose={closeToast}
      PaperProps={{ sx: { ...getPositionStyles(), position: "fixed" } }}
    >
      <DialogTitle>Toast Message</DialogTitle>
      <DialogContent>{message}</DialogContent>
    </Dialog>
  );

  return {
    openToast,
    ToastModal,
  };
};

export default useToast;
