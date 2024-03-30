"use client";

import React from "react";
import { useRouter } from "next/navigation";

const UserPage = () => {
  const router = useRouter();


  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      This is a test developer page
      <button
        className="border-solid rounded-md border-2 p-2 bg-blue-500 text-white"
        onClick={() => {
          localStorage.removeItem("accessToken");
          router.push("/");
        }}
      >
        logout
      </button>
      <button
        className="border-solid rounded-md border-2 p-2 bg-blue-500 text-white"
        onClick={() => {
          router.push("/choose-role");
        }}
      >
        choose role
      </button>
    </div>
  );
};

export default UserPage;
