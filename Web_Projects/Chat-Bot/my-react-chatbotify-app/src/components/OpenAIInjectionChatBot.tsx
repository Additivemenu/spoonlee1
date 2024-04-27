import ChatBot from "react-chatbotify";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Params } from "react-chatbotify";

import { ChatCompletionChunk } from "openai/resources";
import OpenAI from "openai";
import TripTribeLogo from "./triptribe_logo.svg";

export const OpenAIInjectChatBot = () => {
  let api_key: string | null = null;
  let has_error = false;

  // example gemini stream
  // you can replace with other LLMs or even have a simulated stream
  const openai_inject = async (params: Params) => {
    if (api_key === null) {
      // handle the case where api_key is null
      // for example, you might throw an error, or return from the function
      throw new Error("API key is null");
    }

    try {
      const openai = new OpenAI({
        apiKey: api_key,
        // apiKey: "",
        dangerouslyAllowBrowser: true,
      });
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: params.userInput,
          },
        ],
      }); // ! http request to the openai api

      const text = completion.choices[0].message.content;
      if (text === null || text === undefined) {
        await params.injectMessage("chunk text is null or undefined!");
        return;
      }
      await params.injectMessage(text); // ! inject message to the chat screen
    } catch (e) {
      console.error(e);
      await params.injectMessage(
        "Unable to load model, is your API Key valid?"
      );
      has_error = true;
    }
  };

  const flow = {
    start: {
      message: "Enter your OpenAI api key and start asking away!",
      // render: (
      //   <div
      //     style={{
      //       display: "flex",
      //       alignItems: "center",
      //       justifyContent: "center",
      //       marginTop: 10,
      //     }}
      //   >
      //     <button
      //       className="secret-fav-color"
      //       onClick={() => alert("it is very dark")}
      //     >
      //       Hint
      //     </button>
      //   </div>
      // ),
      path: "api_key",
    },
    api_key: {
      message: (params: Params) => {
        api_key = params.userInput.trim();
        return `API key set to ${api_key}, ask me anything!`;
      },
      path: "loop",
    },
    loop: {
      message: async (params: Params) => {
        await openai_inject(params); // ! streaming ai model output to the chat
      },
      path: () => {
        if (has_error) {
          return "start";
        }
        return "loop";
      },
    },
  };

  return (
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
          avatar: TripTribeLogo,
        },
        chatButton: {
          icon: TripTribeLogo, // TODO:
        },
      }}
      flow={flow}
    />
  );
};
