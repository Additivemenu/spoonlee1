"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/choose-role");
    }
    return;
  }, []);

  const handleSumbitLoginForm = async () => {
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    if (!res.ok) {
      alert("login failed");
      return;
    }

    const data = await res.json();
    const accessToken = data.access_token as string;
    if (!accessToken) {
      alert("login failed");
      return;
    }

    // ! store the access token in local storage
    localStorage.setItem("accessToken", accessToken);

    console.log(accessToken);
    const decodedToken = jwt.decode(accessToken);
    console.log(decodedToken);

    router.push("/choose-role");
  };

  // jsx -------------------------------------------------------------
  const usernameInput = (
    <div className="border-solid border-2 flex flex-row ">
      <label htmlFor="username">Username</label>
      <span>:</span>
      <input
        type="text"
        name="username"
        value={username}
        // defaultValue={"username"}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      ></input>
    </div>
  );

  const passwordInput = (
    <div className="border-solid border-2 flex flex-row ">
      <label htmlFor="password">password</label>
      <span>:</span>
      <input
        type="password"
        name="password"
        value={password}
        // defaultValue={"password"}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
    </div>
  );

  const submit = (
    <div>
      <button
        type="button"
        className="border-solid rounded-md border-2 p-2 bg-blue-500 text-white"
        onClick={handleSumbitLoginForm}
      >
        login
      </button>
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      Home page: login
      {usernameInput}
      {passwordInput}
      {submit}
    </main>
  );
}
