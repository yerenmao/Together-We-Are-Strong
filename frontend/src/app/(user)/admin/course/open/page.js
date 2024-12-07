"use client";

import Link from "next/link";
import { useState } from "react";
import Client from "@/utils/Client";
import Course from "@/components/Course";
import { useRouter } from "next/navigation";

function OpenCourseForm({
  id,
  setId,
  name,
  setName,
  credits,
  setCredits,
  type,
  setType,
}) {
  return (
    <div className="bg-slate-400 rounded-3xl flex flex-col justify-center items-center space-y-4 p-10 w-1/2">
      <div className="w-full space-y-1 ">
        <div className="text-xl text-gray-700 font-semibold">課號</div>
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full h-16  border-2 border-black rounded-3xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-base"
          placeholder=""
          type="text"
          required="required"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="w-full space-y-1 ">
        <div className="text-xl text-gray-700 font-semibold">課程名稱</div>
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full h-16  border-2 border-black rounded-3xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-base"
          placeholder=""
          type="text"
          required="required"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="w-full space-y-1 ">
        <div className="text-xl text-gray-700 font-semibold">學分</div>
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full h-16  border-2 border-black rounded-3xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-base"
          placeholder=""
          type="text"
          required="required"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
        />
      </div>
      <div className="w-full space-y-1 ">
        <div className="text-xl text-gray-700 font-semibold">必/選修</div>
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full h-16  border-2 border-black rounded-3xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-base"
          placeholder=""
          type="text"
          required="required"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>
    </div>
  );
}

export default function OpenCourse() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [credits, setCredits] = useState("");
  const [type, setType] = useState("");
  const [doubleCheck, setDoubleCheck] = useState(false);
  const router = useRouter();

  const cancel = (e) => {
    e.preventDefault();
    if (doubleCheck) {
      setDoubleCheck(false);
    } else {
      router.push("/admin");
    }
  };
  const confirm = (e) => {
    e.preventDefault();
    setDoubleCheck(true);
  };
  const openCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await Client.post("/api/course/create", {
        id,
        name,
        credits,
        type,
      });
      alert("課程開設成功");
      router.push("/admin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col pt-20 pb-7">
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="flex space-x-1 text-2xl font-bold mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8 self-center"
          >
            <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
            <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
            <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
          </svg>
          <div>{!doubleCheck ? "填入" : "確認"}課程資訊</div>
        </div>
        {!doubleCheck ? (
          <OpenCourseForm
            id={id}
            setId={setId}
            name={name}
            setName={setName}
            credits={credits}
            setCredits={setCredits}
            type={type}
            setType={setType}
          />
        ) : (
          <Course
            course={{
              id: id,
              name: name,
              credits: credits,
              type: type,
            }}
          />
        )}
        <div className="flex space-x-3">
          <button
            onClick={cancel}
            className="inline-flex w-36 justify-center gap-x-1.5 rounded-3xl px-3 py-2 text-sm font-semibold  bg-gray-700 hover:bg-gray-600 text-white "
          >
            {!doubleCheck ? "取消" : "修改"}
          </button>
          <button
            onClick={!doubleCheck ? confirm : openCourse}
            className="inline-flex w-36 justify-center gap-x-1.5 rounded-3xl px-3 py-2 text-sm font-semibold  bg-gray-700 hover:bg-gray-600 text-white "
          >
            確定
          </button>
        </div>
      </div>
    </div>
  );
}
