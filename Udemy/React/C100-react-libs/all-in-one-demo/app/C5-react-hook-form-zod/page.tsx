"use client";
import { usePathname } from "next/navigation";

// pages/complex-form.tsx
import React from "react";

const demos = [
  {
    title: "Demo 1: Basic Form ",
    path: "/demo1/",
  },
  {
    title: "Demo 2: Pagination + Filtering Form",
    path: "/demo2/",
  },
  {
    title: "Demo 3: recipe form", // https://claritydev.net/blog/managing-forms-with-react-hook-form
    path: "/demo3/",
  },
];

export default function ComplexForm() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg min-w-[500px]">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Complex Form with React Hook Form + Zod
        </h1>
        <ul className="space-y-4">
          {demos.map((demo) => (
            <li key={demo.title}>
              <a
                href={pathname + demo.path}
                className="text-blue-500 hover:underline"
              >
                {demo.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
