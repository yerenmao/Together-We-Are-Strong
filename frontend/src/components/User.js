"use client";

import HeadSvg from "@/components/HeadSvg";

import { useState, useEffect } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

import Client from "@utils/Client";

export default function User({ id }) {
  const [user, setUser] = useState({});
  const [newpwd, setNewpwd] = useState("");
  const [seeNewpwd, setSeeNewpwd] = useState(false);
  const [confpwd, setConfpwd] = useState("");
  const [seeConfpwd, setSeeConfpwd] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Client.get(
          `http://localhost:8080/api/user/profile/${id}`
        );
        console.log(response.data);
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const changePasswd = async (e) => {
    e.preventDefault();
    try {
      const response = await Client.post("/api/user/passwd", {
        newpwd,
        confpwd,
      });
      if (response.data.message === "Success") {
        alert("更改密碼成功");
      } else {
        alert("請確保輸入的兩個密碼相同");
      }
    } catch (err) {
      alert("請確保輸入的兩個密碼相同");
    }
  };

  const role2str = (role) => {
    if (role === "student") {
      return "學生";
    } else if (role === "prof") {
      return "教授";
    } else {
      return "系辦";
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center pt-20">
      <div className="w-1/2 h-4/6 bg-white border-2 border-black rounded-lg text-xl font-semibold p-6">
        <div className="w-full h-1/4 text-3xl flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {/* <HeadSvg size={20} /> */}
            <div className="pl-2 text-nowrap">{user.name}</div>
          </div>
          <div className="text-gray-500 text-xl border-2 p-3 px-10 rounded-full">
            {role2str(user.role)}
          </div>
        </div>
        <div className="flex ">
          <div className="h-full w-1/2 flex flex-col p-5 text-2xl space-y-4">
            <div>{user.email}</div>
            <div>{user.department}</div>
            {user.self ? (
              <>
                <div>更改密碼:</div>
                <form
                  onSubmit={changePasswd}
                  className="pl-5 flex flex-col space-y-2 justify-center relative"
                >
                  <input
                    className="w-full relative placeholder:italic placeholder:text-slate-400 block bg-white h-12 border border-slate-300 rounded-3xl pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-base"
                    placeholder="新密碼"
                    type={seeNewpwd ? "text" : "password"}
                    value={newpwd}
                    onChange={(e) => setNewpwd(e.target.value)}
                  />
                  <span
                    onClick={() => setSeeNewpwd(!seeNewpwd)}
                    className="absolute right-4 top-1 hover:cursor-pointer"
                  >
                    {seeNewpwd ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  <input
                    className="w-full relative placeholder:italic placeholder:text-slate-400 block bg-white h-12 border border-slate-300 rounded-3xl pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-base"
                    placeholder="確認密碼"
                    type={seeConfpwd ? "text" : "password"}
                    value={confpwd}
                    onChange={(e) => setConfpwd(e.target.value)}
                  />
                  <span
                    onClick={() => setSeeConfpwd(!seeConfpwd)}
                    className="absolute right-4 top-15 hover:cursor-pointer"
                  >
                    {seeConfpwd ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  <button
                    className="w-full text-sm p-2 bg-gray-300 hover:bg-gray-200 border-gray-400 border-2 hover:border-3
           rounded-full"
                  >
                    Submit
                  </button>
                </form>
              </>
            ) : (
              <></>
            )}
          </div>
          {user.role === "student" ? (
            <a
              href={`/student/schedule/${id}`}
              target="_blank"
              className="h-full w-1/2 flex flex-col justify-center items-center mt-6"
            >
              <div className="p-10 border-gray-500 border-2 rounded-2xl flex flex-col justify-center items-center">
                <div className="text-3xl">課表</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-32"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </a>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
