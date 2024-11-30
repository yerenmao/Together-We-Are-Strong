"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Client from "@utils/Client";

export default function UserInterface() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [login, setLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Client.get("http://localhost:8080/api/profile");
        setId(response.data["id"]);
        setName(response.data["name"]);
        setLogin(true);
      } catch (error) {
        throw new Error("Permission Denied");
      }
    };
    fetchData();
  }, []);

  const logout = async (e) => {
    e.preventDefault();
    try {
      const response = await Client.post("/api/logout");
      router.push("/login");
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-blue-300 justify-center items-center">
      <div className="p-10 rounded-3xl flex flex-col bg-slate-100 justify-between items-center bg-opacity-40">
        {login ? (
          <>
            <div className="flex flex-col justify-center items-center p-5">
              <p className="p-2 text-lg">學號：{id}</p>
              <p className="p-2 text-lg">姓名：{name}</p>
            </div>
            <button
              onClick={logout}
              className="bg-red-400 bg-opacity-60 py-2 px-4 rounded-2xl"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-4xl font-bold text-red-700">Permission Denied</p>
        )}
      </div>
    </div>
  );
}
