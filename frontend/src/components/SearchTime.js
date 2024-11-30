"use client";

import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function SearchTime({ selectedOptions, setSelectedOptions }) {
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
          節次
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
        className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="flex w-80 bg-white rounded-md">
          <ul className="p-3 space-y-3 text-sm text-black dark:text-gray-200 ">
            <li>
              <div className="inline-flex items-center">
                <label
                  className="flex items-center cursor-pointer relative"
                  htmlFor="check-class1"
                >
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600"
                    onChange={handleCheck}
                    checked={selectedOptions["check-class1"]}
                    id="check-class1"
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
                  className="cursor-pointer ml-2 text-sm text-black"
                  htmlFor="check-class1"
                >
                  0 7:10~8:00
                </label>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center">
                <label
                  className="flex items-center cursor-pointer relative"
                  htmlFor="check-class2"
                >
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600"
                    onChange={handleCheck}
                    checked={selectedOptions["check-class2"]}
                    id="check-class2"
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
                  className="cursor-pointer ml-2 text-sm text-black"
                  htmlFor="check-class2"
                >
                  1 8:10~9:00
                </label>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center">
                <label
                  className="flex items-center cursor-pointer relative"
                  htmlFor="check-class3"
                >
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600"
                    onChange={handleCheck}
                    checked={selectedOptions["check-class3"]}
                    id="check-class3"
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
                  className="cursor-pointer ml-2 text-sm text-black"
                  htmlFor="check-class3"
                >
                  2 9:10~10:00
                </label>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center">
                <label
                  className="flex items-center cursor-pointer relative"
                  htmlFor="check-class4"
                >
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600"
                    onChange={handleCheck}
                    checked={selectedOptions["check-class4"]}
                    id="check-class4"
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
                  className="cursor-pointer ml-2 text-sm text-black"
                  htmlFor="check-class4"
                >
                  3 10:20~11:10
                </label>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center">
                <label
                  className="flex items-center cursor-pointer relative"
                  htmlFor="check-class5"
                >
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600"
                    onChange={handleCheck}
                    checked={selectedOptions["check-class5"]}
                    id="check-class5"
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
                  className="cursor-pointer ml-2 text-sm text-black"
                  htmlFor="check-class5"
                >
                  4 11:20~12:10
                </label>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center">
                <label
                  className="flex items-center cursor-pointer relative"
                  htmlFor="check-class6"
                >
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600"
                    onChange={handleCheck}
                    checked={selectedOptions["check-class6"]}
                    id="check-class6"
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
                  className="cursor-pointer ml-2 text-sm text-black"
                  htmlFor="check-class6"
                >
                  5 12:20~13:10
                </label>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center">
                <label
                  className="flex items-center cursor-pointer relative"
                  htmlFor="check-class7"
                >
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600"
                    onChange={handleCheck}
                    checked={selectedOptions["check-class7"]}
                    id="check-class7"
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
                  className="cursor-pointer ml-2 text-sm text-black"
                  htmlFor="check-class7"
                >
                  6 13:20~14:10
                </label>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center">
                <label
                  className="flex items-center cursor-pointer relative"
                  htmlFor="check-class8"
                >
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600"
                    onChange={handleCheck}
                    checked={selectedOptions["check-class8"]}
                    id="check-class8"
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
                  className="cursor-pointer ml-2 text-sm text-black"
                  htmlFor="check-class8"
                >
                  7 14:20~15:10
                </label>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center">
                <label
                  className="flex items-center cursor-pointer relative"
                  htmlFor="check-class9"
                >
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600"
                    onChange={handleCheck}
                    checked={selectedOptions["check-class9"]}
                    id="check-class9"
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
                  className="cursor-pointer ml-2 text-sm text-black"
                  htmlFor="check-class9"
                >
                  8 15:30~16:20
                </label>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center">
                <label
                  className="flex items-center cursor-pointer relative"
                  htmlFor="check-class10"
                >
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600"
                    onChange={handleCheck}
                    checked={selectedOptions["check-class10"]}
                    id="check-class10"
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
                  className="cursor-pointer ml-2 text-sm text-black"
                  htmlFor="check-class10"
                >
                  9 16:30~17:20
                </label>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center">
                <label
                  className="flex items-center cursor-pointer relative"
                  htmlFor="check-class11"
                >
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600"
                    onChange={handleCheck}
                    checked={selectedOptions["check-class11"]}
                    id="check-class11"
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
                  className="cursor-pointer ml-2 text-sm text-black"
                  htmlFor="check-class11"
                >
                  10 17:30~18:20
                </label>
              </div>
            </li>
          </ul>

          <ul className="p-3 space-y-3 text-sm text-black dark:text-gray-200 ">
            <li>
              <div className="inline-flex items-center">
                <label
                  className="flex items-center cursor-pointer relative"
                  htmlFor="check-class12"
                >
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600"
                    onChange={handleCheck}
                    checked={selectedOptions["check-class12"]}
                    id="check-class12"
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
                  className="cursor-pointer ml-2 text-sm text-black"
                  htmlFor="check-class12"
                >
                  A 18:25~19:15
                </label>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center">
                <label
                  className="flex items-center cursor-pointer relative"
                  htmlFor="check-class13"
                >
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600"
                    onChange={handleCheck}
                    checked={selectedOptions["check-class13"]}
                    id="check-class13"
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
                  className="cursor-pointer ml-2 text-sm text-black"
                  htmlFor="check-class13"
                >
                  B 19:20~20:10
                </label>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center">
                <label
                  className="flex items-center cursor-pointer relative"
                  htmlFor="check-class14"
                >
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600"
                    onChange={handleCheck}
                    checked={selectedOptions["check-class14"]}
                    id="check-class14"
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
                  className="cursor-pointer ml-2 text-sm text-black"
                  htmlFor="check-class14"
                >
                  C 20:15~21:05
                </label>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center">
                <label
                  className="flex items-center cursor-pointer relative"
                  htmlFor="check-class15"
                >
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gray-600 checked:border-gray-600"
                    onChange={handleCheck}
                    checked={selectedOptions["check-class15"]}
                    id="check-class15"
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
                  className="cursor-pointer ml-2 text-sm text-black"
                  htmlFor="check-class15"
                >
                  D 21:10~22:00
                </label>
              </div>
            </li>
          </ul>
        </div>
      </MenuItems>
    </Menu>
  );
}
