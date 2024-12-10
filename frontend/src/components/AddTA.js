"use client";

import SubNav from "./SubNav";
import Link from "next/link";
import { useEffect, useState } from "react";
import Client from "@/utils/Client";
import { useRouter } from "next/navigation";

export default function AddTA({ sectionid }) {
  const [semester, setSemester] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [doubleCheck, setDoubleCheck] = useState(false);
  const [taId, setTaId] = useState("");
  const [taName, setTaName] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Client.get("http://localhost:8080/api/profile");
        setRole(response.data["role"]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getName = async (e) => {
      try {
        const response = await Client.get(`/api/section/getname/${sectionid}`);
        setSemester(response.data.semester);
        setSectionName(response.data.name);
      } catch (err) {
        console.log(err);
      }
    };
    getName();
  }, []);
  const checkTA = async (e) => {
    e.preventDefault();
    try {
      const response = await Client.get(`/api/student/${taId}`);
      if (response.data.message === "Success") {
        setTaName(response.data.name);
        setDoubleCheck(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const addTA = async (e) => {
    e.preventDefault();
    const response = await Client.post("/api/section/ta", { sectionid, taId });
    if (
      response.data.message === "Success" ||
      response.data.message === "Already Exist"
    ) {
      router.push("/professor");
    }
    try {
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full h-screen flex flex-col items-center border-l border-l-gray-400 relative space-y-16">
      <SubNav
        closehref={role === "prof" ? "/professor" : "admin/section"}
        title={"指定課程助教"}
      />
      <div className="flex space-x-1 text-2xl font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-8 self-center"
        >
          <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
        </svg>
        <div>
          {semester} {sectionName}
        </div>
      </div>
      <div className="border border-gray-400 bg-slate-400 rounded-3xl flex flex-col justify-center items-center space-y-7 w-4/12 h-2/5 p-10">
        {!doubleCheck ? (
          <>
            <div className="flex">
              <div className="text-2xl font-bold text-gray-800">
                輸入助教學號
              </div>
            </div>

            <div className="w-5/6 mt-10 mb-2">
              <input
                className=" placeholder:text-slate-400  bg-slate-300 w-full py-2 pl-9 pr-3 shadow-sm text-base"
                placeholder="學號"
                type="text"
                required="required"
                value={taId}
                onChange={(e) => setTaId(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-10 self-center"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>

            <div className="flex ">
              <div className="text-2xl font-bold text-gray-800">
                新增助教：{taName}
              </div>
            </div>
          </>
        )}

        <div className="flex space-x-3">
          <button
            onClick={() => router.back()}
            className="inline-flex w-24 justify-center gap-x-1.5 rounded-3xl px-3 py-2 text-sm font-semibold  bg-gray-700 hover:bg-gray-600 text-white "
          >
            取消
          </button>
          <button
            onClick={!doubleCheck ? checkTA : addTA}
            className="inline-flex w-24 justify-center gap-x-1.5 rounded-3xl px-3 py-2 text-sm font-semibold  bg-gray-700 hover:bg-gray-600 text-white "
          >
            確定
          </button>
        </div>
      </div>
    </div>
  );
}
