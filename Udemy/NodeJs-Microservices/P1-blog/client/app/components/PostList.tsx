"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./comment-create";
import CommentList, { Comment } from "./comment-list";

interface Post {
  id: string;
  title: string;
  comments: Comment[];
}

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPost = async () => {
    const res = await axios.get("http://localhost:4002/posts"); // query service

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  console.log("posts: \n", posts);

  const renderedPosts = Object.values(posts).map((post) => {
    const p = post as Post;

    return (
      <div className="border border-slate-400 p-4 rounded-md" key={p.id}>
        <div className="">
          <h3>{p.title}</h3>

          <CommentList comments={p.comments} />
          <CommentCreate postId={p.id} />
        </div>
      </div>
    );
  });

  return <div className="flex space-x-1 space-y-1">{renderedPosts}</div>;
};

export default PostList;
