"use client";

import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const BlogApp = () => {
  return (
    <div>
      <h1 className="font-medium">Create Post</h1>
      <PostCreate />

      <hr />
      <h1 className="font-medium">Posts</h1>
      <PostList />
    </div>
  );
};

export default BlogApp;
