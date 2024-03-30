"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

const AdminLayout = ({ children }: { children: React.ReactElement }) => {
  const router = useRouter();

  // this check is applied to all pages that are wrapped with this layout
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("no access token");

      // TODO: to add stronger authentication check, check the token in localStorage is not tampered with by checking with server
      router.push("/"); // ! no token, redirect to login page
      return;
    }

    const decodedToken = jwt.decode(accessToken) as JwtPayload;
    const roles = decodedToken.roles;
    console.log(roles);
    if (!roles.includes("admin")) {
      alert("auth failed: you are not an admin!");
      router.push("/"); // ! no role, redirect to login page
      return;
    }
  }, []);

  return <div>{children}</div>;
};

export default AdminLayout;
