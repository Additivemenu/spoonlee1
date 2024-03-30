"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

const TestDeveloperLayout = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const router = useRouter();

  // this check is applied to all pages that are wrapped with this layout
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
    if (!roles.includes("test developer")) {
      alert("auth failed: you are not a test developer!");
      router.push("/"); // ! no role, redirect to login page
      return;
    }
  }, []);

  return <div>{children}</div>;
};

export default TestDeveloperLayout;
