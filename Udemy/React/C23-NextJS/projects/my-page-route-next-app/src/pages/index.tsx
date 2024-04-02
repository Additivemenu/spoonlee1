import Link from "next/link";
import { GetStaticProps } from "next";
import { Post } from "../types/post"; // Fix the import statement to use lowercase 'post' instead of 'Post'
import { posts } from "../data/posts";

type Props = {
  posts: Post[];
};

// SSG (Static Site Generation) - Next.js will generate the page at build time
export default function Home({ posts }: Props) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Home Page</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div className="border-solid border-2 border-black">
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </div>
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
