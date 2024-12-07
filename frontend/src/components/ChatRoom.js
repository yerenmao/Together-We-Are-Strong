"use client";

import Link from "next/link";
import Client from "@/utils/Client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import ChatRoomPreview from "./ChatRoomPreview";

function ChatRoomNav({ params }) {
  return (
    <nav className="flex h-14 w-full border-b-gray-400 bg-gray-200  border-b">
      <Link
        href="/group/join"
        className="relative group inline-block m-0 h-10 w-10 ml-6 mt-2"
      >
        <button className="hover:bg-gray-400 rounded-full h-10 w-10 items-center self-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="true"
            className="size-6 ml-2 self-center"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-max bg-gray-300 text-gray-500 text-xs rounded-xl py-1 px-2 hidden group-hover:block">
          加入群組
        </div>
      </Link>

      <Link
        href="/group/create"
        className="relative group inline-block m-0 h-10 w-10 ml-1 mt-2"
      >
        <button className="hover:bg-gray-400 rounded-full h-10 w-10 items-center self-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 ml-2 self-center"
          >
            <path
              fillRule="evenodd"
              d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
              clipRule="evenodd"
            />
            <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
          </svg>
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-max bg-gray-300 text-gray-500 text-xs rounded-xl py-1 px-2 hidden group-hover:block">
          創立群組
        </div>
      </Link>
    </nav>
  );
}

export default function ChatRoom({ params }) {
  const [groups, setGroups] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Client.get(
          `http://localhost:8080/api/group/mine`
        );
        setGroups(response.data.groups);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [pathname]);
  return (
    <>
      <div className="relative flex flex-col h-full w-full">
        {/* nav */}
        <ChatRoomNav />
        {/* 聊天室預覽 */}
        <div className="overflow-auto basis-[93.5%]">
          {groups.map((group, index) => (
            <ChatRoomPreview key={index} index={index} group={group} />
          ))}
        </div>
      </div>
    </>
  );
}
