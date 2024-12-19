"use client";

import React, { useState } from "react";
import axios from "axios";

interface CommentCreateProps {
  postId: string;
}

const CommentCreate = ({ postId }: CommentCreateProps) => {
  const [content, setContent] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });

    setContent("");
  };

  return (
    <form
      className="form-group flex flex-col space-y-2 border p-2 rounded-md mt-2"
      onSubmit={onSubmit}
    >
      <label>New Comment</label>
      <input
        type="text"
        className="form-control border border-s-violet-300 rounded-md"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        className="border p-1 rounded-md hover:bg-blue-300 w-20"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default CommentCreate;
