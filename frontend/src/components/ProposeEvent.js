"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Client from "@/utils/Client";

import SubNav from "./SubNav";

function ProposeBody({
  message,
  setMessage,
  semester,
  setSemester,
  section,
  setSection,
}) {
  return (
    <>
      <div className="w-2/3">
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-slate-300 w-full  py-2 pl-9 pr-3 shadow-sm text-base"
          placeholder="輸入揪團名稱"
          type="text"
          required="required"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="w-2/3">
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-slate-300 w-full  py-2 pl-9 pr-3 shadow-sm text-base"
          placeholder="輸入學期"
          type="text"
          required="required"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />
      </div>
      <div className="w-2/3">
        <input
          className="placeholder:italic self-center placeholder:text-slate-400 block bg-slate-300 w-full  py-2 pl-9 pr-3 shadow-sm text-base"
          placeholder="想揪的課（課程流水號/課號）"
          type="text"
          required="required"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />
      </div>
    </>
  );
}

function ProposeCheck({ message, courseName, semester }) {
  return (
    <>
      <div className="text-xl font-bold">
        <div className="flex justify-center text-center">
          <div>團名：</div>
          <div>{message}</div>
        </div>
        <div className="flex justify-center text-center">
          <div>想揪的課：</div>
          <div>{courseName}</div>
        </div>
        <div className="flex  justify-center text-center">
          <div>學期：</div>
          <div>{semester}</div>
        </div>
      </div>
    </>
  );
}

export default function ProposeEvent({ path }) {
  const [message, setMessage] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [check, setCheck] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const checkPropose = async (e) => {
    e.preventDefault();
    try {
      const response = await Client.get("/api/section/check", {
        params: {
          message,
          semester,
          section,
          courseName,
        },
      });
      if (response.data.message === "Success") {
        setCourseName(response.data.courseName);
        setCheck(true);
        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const submitPropose = async (e) => {
    e.preventDefault();
    try {
      const response = await Client.post(`/api/event/create/`, {
        path,
        message,
        semester,
        section,
        courseName,
      });
      console.log(response.data);
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
        <SubNav
          backhref={`/group/${path}`}
          closehref={`/group/${path}`}
          title={"開始揪團"}
        />
        <div className="basis-[93.5%] w-2/3 flex justify-center items-center">
          <div className="border border-gray-400 bg-slate-400 rounded-3xl flex flex-col justify-evenly items-center w-2/3 h-2/3">
            <div className="flex flex-col">
              <div className="flex space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-8 self-center"
                >
                  <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                  <path
                    fillRule="evenodd"
                    d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-2xl font-bold">
                  {!check ? "填入揪團資訊" : "確認揪團資訊"}
                </div>
              </div>
              <div
                className={`flex justify-center text-sm text-red-500 ${
                  error ? "visible" : "invisible"
                }`}
              >
                查不到此課程
              </div>
            </div>
            {!check ? (
              <ProposeBody
                message={message}
                setMessage={setMessage}
                semester={semester}
                setSemester={setSemester}
                section={section}
                setSection={setSection}
              />
            ) : (
              <ProposeCheck
                message={message}
                courseName={courseName}
                semester={semester}
              />
            )}

            <div className="flex space-x-3">
              <Link
                href={`/group/${path}`}
                className="inline-flex w-24 justify-center gap-x-1.5 rounded-3xl px-3 py-2 text-sm font-semibold  bg-gray-700 hover:bg-gray-600 text-white "
              >
                取消
              </Link>
              <button
                onClick={!check ? checkPropose : submitPropose}
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
