"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

const ChooseRolePage = () => {
  const router = useRouter();
  const [roles, setRoles] = useState<string[]>([]);
  //   let userRoles: string[] = [];

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("no access token");
      router.push("/"); // ! no token, redirect to login page
      return;
    }

    const decodedToken = jwt.decode(accessToken) as JwtPayload;
    const roles = decodedToken.roles;
    console.log(roles);
    // userRoles = roles;
    setRoles(roles);
  }, []);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-24"'>
      this is choose role page
      {roles.includes("marker") && (
        <button
          className="border-solid rounded-md border-2 p-2 bg-blue-500 text-white"
          onClick={() => {
            router.push("/marker");
          }}
        >
          login as marker
        </button>
      )}
      {roles.includes("admin") && (
        <button
          className="border-solid rounded-md border-2 p-2 bg-blue-500 text-white"
          onClick={() => {
            router.push("/admin");
          }}
        >
          login as admin
        </button>
      )}
      {roles.includes("test developer") && (
        <button
          className="border-solid rounded-md border-2 p-2 bg-blue-500 text-white"
          onClick={() => {
            router.push("/test-developer");
          }}
        >
          login as test developer
        </button>
      )}
    </div>
  );
};

export default ChooseRolePage;
