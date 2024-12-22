"use client";

import React from "react";

interface CommentListProps {
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
}

const CommentList = ({ comments }: CommentListProps) => {
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
