"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface CommentListProps {
  postId: string;
}

interface Comment {
  id: string;
  content: string;
}

const CommentList = ({ postId }: CommentListProps) => {
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`,
    );

    setComments(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderedComments = comments.map((comment) => {
    const c = comment as Comment;

    return (
      <li key={c.id} className="border border-slate-400 p-2 rounded-md">
        comment: {c.content}
      </li>
    );
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
