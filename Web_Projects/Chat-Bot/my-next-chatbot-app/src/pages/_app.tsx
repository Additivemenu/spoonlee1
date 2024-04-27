import "@/styles/globals.css";
// import "../../node_modules/react-chatbotify/dist/react-chatbotify.css"
import "../styles/react-chatbotify.css";

import type { AppProps } from "next/app";

import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
