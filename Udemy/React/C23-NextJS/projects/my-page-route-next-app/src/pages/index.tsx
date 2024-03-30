import Link from "next/link";
import { GetStaticProps } from "next";
import { Post } from "../types/post"; // Fix the import statement to use lowercase 'post' instead of 'Post'
import { posts } from "../data/posts";

type Props = {
  posts: Post[];
};

export default function Home({ posts }: Props) {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts,
    },
  };
};
