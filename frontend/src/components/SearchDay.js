"use client";

import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function SearchDay({ selectedOptions, setSelectedOptions }) {
  const handleCheck = (e) => {
    const { id, checked } = e.target;
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  return (
    <Menu as="div" className="relative text-left">
      <div>
        <MenuButton className="inline-flex w-48 justify-between text-sm font-semibold text-gray-900 rounded-3xl bg-white px-3 py-2  shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          上課時間
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <ul className="p-3 space-y-3 text-sm scroll-smooth">
          <li>
            <div className="inline-flex items-center">
              <label
                className="flex items-center cursor-pointer relative"
                htmlFor="check-1"
              >
                <input
                  type="checkbox"
                  className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600 checked:"
                  onChange={handleCheck}
                  checked={selectedOptions["check-1"]}
                  id="check-1"
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
              <label className="cursor-pointer ml-2 text-sm" htmlFor="check-1">
                週一
              </label>
            </div>
          </li>

          <li>
            <div className="inline-flex items-center">
              <label
                className="flex items-center cursor-pointer relative"
                htmlFor="check-2"
              >
                <input
                  type="checkbox"
                  className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600"
                  onChange={handleCheck}
                  checked={selectedOptions["check-2"]}
                  id="check-2"
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
              <label className="cursor-pointer ml-2 text-sm" htmlFor="check-2">
                週二
              </label>
            </div>
          </li>

          <li>
            <div className="inline-flex items-center">
              <label
                className="flex items-center cursor-pointer relative"
                htmlFor="check-3"
              >
                <input
                  type="checkbox"
                  className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600"
                  onChange={handleCheck}
                  checked={selectedOptions["check-3"]}
                  id="check-3"
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
              <label className="cursor-pointer ml-2 text-sm" htmlFor="check-3">
                週三
              </label>
            </div>
          </li>

          <li>
            <div className="inline-flex items-center">
              <label
                className="flex items-center cursor-pointer relative"
                htmlFor="check-4"
              >
                <input
                  type="checkbox"
                  className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600"
                  onChange={handleCheck}
                  checked={selectedOptions["check-4"]}
                  id="check-4"
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
              <label className="cursor-pointer ml-2 text-sm" htmlFor="check-4">
                週四
              </label>
            </div>
          </li>

          <li>
            <div className="inline-flex items-center">
              <label
                className="flex items-center cursor-pointer relative"
                htmlFor="check-5"
              >
                <input
                  type="checkbox"
                  className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600"
                  onChange={handleCheck}
                  checked={selectedOptions["check-5"]}
                  id="check-5"
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
              <label className="cursor-pointer ml-2 text-sm" htmlFor="check-5">
                週五
              </label>
            </div>
          </li>

          <li>
            <div className="inline-flex items-center">
              <label
                className="flex items-center cursor-pointer relative"
                htmlFor="check-6"
              >
                <input
                  type="checkbox"
                  className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600"
                  onChange={handleCheck}
                  checked={selectedOptions["check-6"]}
                  id="check-6"
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
              <label className="cursor-pointer ml-2 text-sm" htmlFor="check-6">
                週六
              </label>
            </div>
          </li>
        </ul>
      </MenuItems>
    </Menu>
  );
}
