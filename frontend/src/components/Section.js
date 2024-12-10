"use client";

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import Link from "next/link";
import Client from "@/utils/Client";
import { useRouter } from "next/navigation";
import { useState } from "react";

function convert_time(time) {
  return Object.fromEntries(
    Object.entries(time).map(([key, values]) => [
      key,
      values.map((value) => {
        if (value === 11) return "A";
        if (value === 12) return "B";
        if (value === 13) return "C";
        if (value === 14) return "D";
        return value.toString();
      }),
    ])
  );
}

export default function Section({
  index,
  section,
  prof = false,
  demo = false,
}) {
  console.log(section);
  const [TAs, setTAs] = useState(section.TAs);
  console.log(TAs);
  const time = convert_time(section.time);
  const formattedString = Object.entries(time)
    .map(([key, values]) => `${key} ${values.join(",")}`)
    .join("\n");

  const removeTA = async (ta) => {
    const response = await Client.post("/api/section/ta/delete", {
      section_id: section.id,
      name: ta.name,
    });
    if (response.data.message == "Success") {
      setTAs(TAs.filter((item) => item.name !== ta.name));
    }
  };
  const addSection = async (section_id) => {
    try {
      const response = await Client.post("/api/section/schedule", {
        section_id,
      });
      console.log(response);
      if (response.data.message == "Success") {
        alert("選課成功！");
      } else if (response.data.error == "Overflow") {
        alert("該課程已達人數上限");
      } else if (response.data.error == "Overlap") {
        alert("請注意衝堂問題");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div
        id={`section-${index}`}
        className="w-5/6 h-24 bg-white border-2 border-black rounded-lg flex items-center justify-between p-6 text-xl font-semibold m-3"
      >
        <div className="w-1/4 flex flex-col">
          <div className="text-nowrap">
            {section.name}-{section.professor}
          </div>
          <div className="text-sm text-gray-400 text-nowrap">
            課號 {section.course_id}, 流水號 {section.section_id}
          </div>
          <div className="text-sm text-gray-400 text-nowrap">
            [{section.type}] 人數：{section.cur_students} /{" "}
            {section.max_students}
          </div>
        </div>
        <div className="flex w-3/5 justify-between items-center ">
          <div className="flex flex-col items-center w-16">
            <div>學期</div>
            <div className="text-base text-gray-700">{section.semester}</div>
          </div>
          <div className="flex flex-col items-center w-16">
            <div>系所</div>
            <div className="text-base text-gray-700">{section.department}</div>
          </div>
          <div className="flex flex-col items-center w-16">
            <div>學分</div>
            <div className="text-base text-gray-700">{section.credits}學分</div>
          </div>
          <div className="flex flex-col items-center w-16">
            <div>時間</div>
            <pre className="text-base text-gray-700">{formattedString}</pre>
          </div>
          <div className="flex flex-col items-center w-20">
            <div>教室</div>
            <div className="text-base text-gray-700">
              {section.classroom !== "NaN" ? section.classroom : "未公布"}
            </div>
          </div>
          {prof ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <a
                href={`/section/${section.id}`}
                target="_blank"
                className="bg-gray-700 hover:bg-slate-600 text-white text-base text-center font-medium rounded-3xl w-28"
              >
                課程大綱
              </a>
              <Menu as="div" className="relative inline-block text-left">
                <div className="right-10">
                  <MenuButton className="hover:bg-gray-50 border-2 border-gray-500 text-base font-medium rounded-3xl w-28">
                    助教
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="z-20 absolute mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {TAs.map((ta, index) => (
                      <MenuItem key={index}>
                        <div className="flex justify-between items-center hover:text-gray-900 hover:bg-gray-100">
                          <a
                            href={`/profile/${ta.id}`}
                            target="_blank"
                            className="block px-4 py-2 text-sm text-gray-700 "
                          >
                            {ta.name}
                          </a>
                          <button onClick={() => removeTA(ta)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6 text-red-400 hover:bg-red-200 rounded-full"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </MenuItem>
                    ))}

                    <MenuItem>
                      <Link
                        href={`/ta/${section.id}`}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        新增助教
                      </Link>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <Link
                href={`/section/${section.id}`}
                className="bg-gray-700 hover:bg-slate-600 text-white text-base text-center font-medium rounded-3xl w-28"
              >
                課程大綱
              </Link>
              {!demo ? (
                <button
                  onClick={() => addSection(section.id)}
                  className="flex text-base text-center items-center justify-center hover:bg-gray-50 rounded-3xl border-2 border-gray-500 w-28"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <div>選課</div>
                </button>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
