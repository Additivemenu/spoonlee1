import Link from "next/link";

const content = [
  {
    title: "C1-framer-motion",
    path: "/C1-framer-motion/",
  },
  {
    title: "C2-react-flow",
    path: "/C2-react-flow/",
  },
  {
    title: "C3-react-query",
    path: "/C3-react-query/",
  },
  {
    title: "C4-XLSX",
    path: "/C4-XLSX/",
  },
  {
    title: "C5-react-hook-form-zod",
    path: "/C5-react-hook-form-zod/",
  },
];

export default function Home() {
  return (
    <>
      <h2 className="text-red-500">
        {" "}
        try to keep each page as independent as possible
      </h2>
      {content.map((item) => (
        <Link key={item.title} href={item.path}>
          <h1 className="text-2xl font-bold">{item.title}</h1>
        </Link>
      ))}
    </>
  );
}
