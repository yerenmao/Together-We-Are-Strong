"use client";

import Link from "next/link";
import Client from "@utils/Client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

function Options({ role }) {
  if (role === "student") {
    return (
      <>
        <Link href="/student" className="hover:text-gray-300 mx-10">
          查詢
        </Link>
        <Link href="/group" className="hover:text-gray-300 mx-10">
          群組
        </Link>
      </>
    );
  } else if (role === "prof") {
    return (
      <Link href="/professor" className="hover:text-gray-300 mx-10">
        課程
      </Link>
    );
  } else if (role === "admin") {
    return (
      <>
        <Link href="/admin" className="hover:text-gray-300 mx-10">
          課程
        </Link>
        <Link href="/admin/course/open" className="hover:text-gray-300 mx-10">
          開設課程
        </Link>
      </>
    );
  } else {
    return <></>;
  }
}

export default function Navbar({ params }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Client.get("http://localhost:8080/api/profile");
        setId(response.data["id"]);
        setName(response.data["name"]);
        setRole(response.data["role"]);
      } catch (error) {
        console.log(error);
        // throw new Error("Permission Denied");
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
    <>
      <nav className="bg-gray-900 fixed w-full z-20 top-0 start-0 h-20">
        <div className="w-full flex justify-between mx-auto mt-6">
          <div className="flex font-semibold text-lg text-slate-100 h-full justify-between pl-10">
            <Options role={role} />
          </div>

          <Menu as="div" className="relative inline-block text-left">
            <div className="right-10 pr-3">
              <MenuButton className="inline-flex w-24 justify-center gap-x-1.5 rounded-3xl px-3 py-2 text-sm font-semibold  bg-blue-700 hover:bg-blue-600 text-white ">
                {name !== "" ? name : "Loading"}
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    個人檔案
                  </a>
                </MenuItem>
                <form action="#" method="POST">
                  <MenuItem>
                    <button
                      onClick={logout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      登出
                    </button>
                  </MenuItem>
                </form>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </nav>
    </>
  );
}
