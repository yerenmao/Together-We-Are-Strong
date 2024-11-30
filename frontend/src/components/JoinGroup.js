"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Client from "@/utils/Client";

function JoinGroupNav({ params }) {
  return (
    <>
      <nav className="flex h-14 w-full border-b-gray-400 bg-gray-200 border-b justify-between">
        <Link
          href="/group"
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
            回上一頁
          </div>
        </Link>
        <div className="flex">
          <p className="self-center font-bold">加入群組</p>
        </div>
        <Link
          href="/group"
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
    </>
  );
}

export default function JoinGroup({ params }) {
  const [path, setPath] = useState("");
  const router = useRouter();
  const join_group = async (e) => {
    e.preventDefault();
    try {
      const response = await Client.post("/api/group/join", { path });
      if (response.data.message === "Success") {
        router.push(`/group/${path}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="w-full h-full flex flex-col items-center border-l border-l-gray-400 relative">
        <JoinGroupNav />
        <div className="basis-[93.5%] w-2/3 flex justify-center items-center">
          <form
            onSubmit={join_group}
            className="border border-gray-400 bg-slate-400 rounded-3xl flex flex-col justify-evenly items-center w-2/3 h-2/3"
          >
            <div className="flex space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8 self-center"
              >
                <path
                  fillRule="evenodd"
                  d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                  clipRule="evenodd"
                />
                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
              </svg>

              <div className="text-2xl font-bold">填入群組驗證碼</div>
            </div>

            <div className="w-2/3">
              <input
                className="placeholder:italic placeholder:text-slate-400 block bg-slate-300 w-full  py-2 pl-9 pr-3 shadow-sm text-base"
                placeholder="輸入驗證碼"
                type="text"
                required="required"
                value={path}
                onChange={(e) => setPath(e.target.value)}
              />
            </div>

            <div className="flex space-x-3">
              <Link
                href="/group"
                className="inline-flex w-24 justify-center gap-x-1.5 rounded-3xl px-3 py-2 text-sm font-semibold  bg-gray-700 hover:bg-gray-600 text-white "
              >
                取消
              </Link>
              <button className="inline-flex w-24 justify-center gap-x-1.5 rounded-3xl px-3 py-2 text-sm font-semibold  bg-gray-700 hover:bg-gray-600 text-white ">
                確定
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
