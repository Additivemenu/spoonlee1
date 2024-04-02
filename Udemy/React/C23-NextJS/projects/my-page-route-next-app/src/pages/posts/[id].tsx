import { GetServerSideProps } from "next";
import { Post } from "../../types/post";
import { posts } from "../../data/posts";

type Props = {
  post: Post;
};

// SSR (Server Side Rendering) - Next.js will generate the page on each request
export default function PostPage({ post }: Props) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string }; // context is an object that contains information about the incoming request
  const post = posts.find((post) => post.id === id);

  return {
    props: {
      post,
    },
  };
};
