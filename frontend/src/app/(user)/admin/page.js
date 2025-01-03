"use client";

import Course from "@/components/Course";
import Section from "@/components/Section";
import UserSimple from "@/components/UserSimple";

import { useEffect, useState } from "react";
import Client from "@/utils/Client";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const findUsers = async (e) => {
    e.preventDefault();
    try {
      const response = await Client.get("/api/user/search", {
        params: {
          query: query,
        },
      });
      console.log(response.data);
      setUsers(response.data.users);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full min-h-screen flex flex-col pt-20 pb-7">
      <div className="flex flex-col justify-center items-center space-y-4 text-2xl font-semibold text-gray-600 p-8">
        <div>系上使用者</div>
        <form
          onSubmit={findUsers}
          className="w-1/3 flex justify-center relative"
        >
          <input
            className="w-full relative placeholder:italic placeholder:text-slate-400 block bg-white h-16 border border-slate-300 rounded-3xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-base"
            placeholder="姓名 / ID"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="absolute right-2 top-3 text-sm p-2 bg-gray-300 hover:bg-gray-200 border-gray-400 border-2 hover:border-3
           rounded-full"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="flex flex-col justify-center items-center space-y-5 w-full h-auto">
        {users.map((user, index) => (
          <UserSimple key={index} user={user} />
        ))}
      </div>
    </div>
  );
}
