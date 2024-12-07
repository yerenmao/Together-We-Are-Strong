"use client";

import Link from "next/link";
import Client from "@/utils/Client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import SubNav from "./SubNav";

export default function Voting({ path, eventid }) {
  const [join, setJoin] = useState(0); // 0 = no choise, 1 = yes, 2 = no
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleCheck = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setError(false);
    }
    if (id === "check-join") {
      setJoin(checked ? 1 : 0);
    } else if (id === "check-notjoin") {
      setJoin(checked ? 2 : 0);
    }
  };

  const participate = async (e) => {
    e.preventDefault();
    try {
      if (join === 0) {
        setError(true);
        return;
      }
      const response = await Client.post("/api/event/participate", {
        path,
        eventid,
        join,
      });
      router.push(`/group/${path}/result/${eventid}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="w-full h-full flex flex-col items-center border-l border-l-gray-400 relative">
        <SubNav
          backhref={`/group/${path}`}
          closehref={`/group/${path}`}
          title={"投票"}
        />
        <div className="basis-[93.5%] w-2/3 flex justify-center items-center">
          <div className="border border-gray-400 bg-slate-400 rounded-3xl flex flex-col justify-evenly items-center w-2/3 h-2/3">
            <div className="text-2xl font-bold">
              <div className="flex justify-center text-center">
                <div>團名：</div>
                <div>這是團名</div>
              </div>
              <div className="flex justify-center text-center">
                <div>想揪的課：</div>
                <div>資料庫管理</div>
              </div>
              <div className="flex  justify-center text-center">
                <div>學期：</div>
                <div>113-1</div>
              </div>
            </div>
            <div className="flex justify-center items-center space-x-5 w-full ">
              <div className="inline-flex items-center ">
                <label
                  className="flex items-center cursor-pointer relative"
                  htmlFor="check-join"
                >
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-600 checked:bg-gray-600 checked:border-gray-600 checked:"
                    onChange={handleCheck}
                    checked={join === 1}
                    id="check-join"
                  />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        chip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                <label
                  className="cursor-pointer ml-2 text-xl"
                  htmlFor="check-join"
                >
                  參加
                </label>
              </div>
              <div className="inline-flex items-center ">
                <label
                  className="flex items-center cursor-pointer relative"
                  htmlFor="check-notjoin"
                >
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-600 checked:bg-gray-600 checked:border-gray-600 checked:"
                    onChange={handleCheck}
                    checked={join === 2}
                    id="check-notjoin"
                  />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        chip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                <label
                  className="cursor-pointer ml-2 text-xl"
                  htmlFor="check-notjoin"
                >
                  不參加
                </label>
              </div>
            </div>
            <div className={`text-red-500 ${error ? "visible" : "invisible"}`}>
              請選擇參加或不參加
            </div>

            <div className="flex space-x-3">
              <Link
                href={`/group/${path}`}
                className="inline-flex w-24 justify-center gap-x-1.5 rounded-3xl px-3 py-2 text-sm font-semibold  bg-gray-700 hover:bg-gray-600 text-white "
              >
                取消
              </Link>
              <button
                onClick={participate}
                className="inline-flex w-24 justify-center gap-x-1.5 rounded-3xl px-3 py-2 text-sm font-semibold  bg-gray-700 hover:bg-gray-600 text-white "
              >
                確定
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
