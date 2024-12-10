"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SubNav({ closehref, title }) {
  const router = useRouter();
  return (
    <nav className="flex h-14 w-full border-b-gray-400 bg-gray-200 border-b justify-between">
      <div
        onClick={() => router.back()}
        className="relative group inline-block ml-3 h-10 w-10 mt-2 "
      >
        <button className="hover:bg-gray-400 rounded-full h-10 w-10 items-center self-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 ml-2 self-center"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-max bg-gray-300 text-gray-500 text-xs rounded-xl py-1 px-2 hidden group-hover:block">
          上一頁
        </div>
      </div>
      <div className="flex">
        <p className="self-center font-bold">{title}</p>
      </div>
      <Link
        href={closehref}
        className="relative group inline-block mr-6 h-10 w-10 mt-2 "
      >
        <button className="hover:bg-gray-400 rounded-full h-10 w-10 items-center self-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 ml-2 self-center"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-max bg-gray-300 text-gray-500 text-xs rounded-xl py-1 px-2 hidden group-hover:block">
          離開
        </div>
      </Link>
    </nav>
  );
}
