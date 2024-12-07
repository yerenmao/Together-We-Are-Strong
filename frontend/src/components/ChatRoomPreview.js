"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ChatRoomPreview({ group }) {
  const pathname = usePathname();
  const background = pathname.includes(group.path) ? `bg-gray-300` : "";

  return (
    <>
      <Link
        href={`/group/${group.path}`}
        className={`flex ${background}  h-20 w-full`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="gray"
          className="size-16 self-center ml-2"
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            clipRule="evenodd"
          />
        </svg>
        <div className="w-3/5 h-full justify-evenly">
          <p className="mt-3 ml-2 font-semibold text-base overflow-hidden whitespace-nowrap text-ellipsis ">
            {group.name}
            {/* 群組名稱這是一段超長文字我要測試換行 */}
          </p>
          <p className="mt-2 ml-2 text-sm text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis ">
            {/* 聊天內容這是一段超長文字我要測試換行 */}
          </p>
        </div>
        {/* <p className="mt-3 ml-3 text-sm text-gray-500">18:00</p> */}
      </Link>
    </>
  );
}
