"use client";

import React from "react";

interface CommentListProps {
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  status: "pending" | "approved" | "rejected";
}

const CommentList = ({ comments }: CommentListProps) => {
  const renderedComments = comments.map((comment) => {
    const c = comment as Comment;

    if (c.status === "pending") {
      return <li key={c.id}>This comment is awaiting moderation</li>;
    }

    if (c.status === "rejected") {
      return <li key={c.id}>This comment has been rejected</li>;
    }

    return (
      <li key={c.id} className="border border-slate-400 p-2 rounded-md">
        comment: {c.content}
      </li>
    );
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
