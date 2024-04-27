"use client";

import { Inter } from "next/font/google";
import ChatBotifyBot from "@/components/ChatBotifyBot";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <ChatBotifyBot />
    </main>
  );
}
