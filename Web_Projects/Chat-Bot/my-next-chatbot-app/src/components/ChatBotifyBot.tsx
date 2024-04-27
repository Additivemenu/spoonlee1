"use client";
import { lazy, Suspense, useEffect, useState } from "react";
import TripTribeLogo from "./triptribe_logo.svg";

const ChatBotifyBot = () => {
  const ChatBot = lazy(() => import("react-chatbotify"));
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded && (
        <Suspense fallback={<div>Loading...</div>}>
          <ChatBot
            options={{
              theme: {
                primaryColor: "#42b0c5",
                secondaryColor: "#491d8d",
                // secondaryColor: "grey",
                embedded: false,
              },
              chatHistory: { storageKey: "example_real_time_stream" },
              botBubble: { simStream: true },
              header: {
                title: (
                  <h3
                    style={{ cursor: "pointer", margin: 0 }}
                    onClick={() => window.open("https://github.com/tjtanjin/")}
                  >
                    TripTribe Bot
                  </h3>
                ),
                showAvatar: true,
                // avatar: TripTribeLogo,
              },
              //   chatButton: {
              //     icon: TripTribeLogo, // TODO:
              //   },
            }}
          />
        </Suspense>
      )}
    </>
  );
};

export default ChatBotifyBot;
