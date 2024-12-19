"use client";

import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post("http://localhost:4000/posts", {
      title,
    });

    setTitle("");
  };

  return (
    <div className="border border-slate-400 p-4 rounded-md">
      <form action="" onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="ml-2 form-control border border-s-violet-300"
          />
        </div>
        <button className="rounded-md my-2 border p-2">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
