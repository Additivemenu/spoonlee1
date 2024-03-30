"use client";

import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

const AdminPage = () => {
  const router = useRouter();

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   if (!accessToken) {
  //     alert("no access token");
  //     router.push("/"); // ! no token, redirect to login page
  //     return;
  //   }

  //   const decodedToken = jwt.decode(accessToken) as JwtPayload;
  //   const roles = decodedToken.roles;
  //   console.log(roles);
  //   if (!roles.includes("admin")) {
  //     alert("no admin role");
  //     router.push("/"); // ! no admin role, redirect to login page
  //     return;
  //   }
  // }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      This is admin page
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

export default AdminPage;
