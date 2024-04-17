import ChatBot from "react-chatbotify";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Params } from "react-chatbotify";

export const GeminiChatBot = () => {
  let api_key: string | null = null;
  let has_error = false;

  // example gemini stream
  // you can replace with other LLMs or even have a simulated stream
  const gemini_stream = async (params: Params) => {
    if (api_key === null) {
      // handle the case where api_key is null
      // for example, you might throw an error, or return from the function
      throw new Error("API key is null");
    }

    try {
      const genAI = new GoogleGenerativeAI(api_key);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContentStream(params.userInput); // ! the ai model output

      // then stream the result get from the ai model
      let text = "";
      let offset = 0;
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        text += chunkText;
        for (let i = offset; i < chunkText.length; i++) {
          // while this example shows params.streamMessage taking in text input,
          // ! you may also feed it custom JSX.Element if you wish
          await params.streamMessage(text.slice(0, i + 1));
          await new Promise((resolve) => setTimeout(resolve, 30));
        }
        offset += chunkText.length;
      }

      // in case any remaining chunks are missed (e.g. timeout)
      // you may do your own nicer logic handling for large chunks
      for (let i = offset; i < text.length; i++) {
        await params.streamMessage(text.slice(0, i + 1));
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
      await params.streamMessage(text);
    } catch {
      await params.injectMessage(
        "Unable to load model, is your API Key valid?"
      );
      has_error = true;
    }
  };

  const flow = {
    start: {
      message: "Enter your gemini api key and start asking away!",
      path: "api_key",
    },
    api_key: {
      message: (params: Params) => {
        api_key = params.userInput.trim();
        return "Ask me anything!";
      },
      path: "loop",
    },
    loop: {
      message: async (params: Params) => {
        await gemini_stream(params); // ! streaming ai model output to the chat
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
        theme: { embedded: true },
        chatHistory: { storageKey: "example_real_time_stream" },
        botBubble: { simStream: true },
      }}
      flow={flow}
    />
  );
};
