"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Client from "@utils/Client";

export default function Register() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [passwd, setPasswd] = useState("");
  const [res, setRes] = useState("");
  const router = useRouter();

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await Client.post("/api/register", { id, name, passwd });
      router.push("/login");
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-blue-300 justify-center items-center">
      <div className="p-10 rounded-3xl flex flex-col bg-slate-100 justify-between items-center bg-opacity-40">
        <h1 className="text-3xl m-5 text-red-500">Register</h1>
        <form onSubmit={register} className="flex flex-col items-center">
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Student ID"
            required="required"
            className="m-5 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required="required"
            className="m-5 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          />
          <input
            type="text"
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
            placeholder="Password"
            required="required"
            className="m-5 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          />
          <button
            type="submit"
            className="py-3 px-6 rounded-3xl bg-slate-600 text-slate-100 hover:border-blue-400 border-2"
          >
            Submit
          </button>
        </form>
        <p className="py-2 text-lg text-slate-700">{res}</p>
      </div>
    </div>
  );
}
