import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import Link from "next/link";

export default function Section({ index, section, prof = false }) {
  console.log(section);
  const formattedString = Object.entries(section.time)
    .map(([key, values]) => `${key} ${values.join(",")}`)
    .join("\n");
  return (
    <>
      <div
        id={`section-${index}`}
        className="w-5/6 h-24 bg-white border-2 border-black rounded-lg flex items-center justify-between p-6 text-xl font-semibold m-3"
      >
        <div className="w-1/4 flex">
          <div>{section.name}-</div>
          <div>{section.professor}</div>
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
          <div className="flex flex-col items-center w-16">
            <div>教室</div>
            <div className="text-base text-gray-700">
              {section.classroom ? section.classroom : "未公布"}
            </div>
          </div>
          {prof ? (
            <Menu as="div" className="relative inline-block text-left">
              <div className="right-10 pr-3">
                <MenuButton className="bg-gray-700 hover:bg-slate-600 text-white text-base font-medium rounded-3xl w-20">
                  助教
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="z-20 absolute mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  {section.TAs.map((name, index) => (
                    <MenuItem key={index}>
                      <div className="flex justify-between items-center hover:text-gray-900 hover:bg-gray-100">
                        <Link
                          href={"/student/home"}
                          className="block px-4 py-2 text-sm text-gray-700 "
                        >
                          {name}
                        </Link>
                        <button>
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
                      href={`/professor/ta/${section.id}`}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      新增助教
                    </Link>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          ) : (
            <button className="bg-gray-700 hover:bg-slate-600 text-white text-base font-medium rounded-3xl w-28">
              課程大綱
            </button>
          )}
        </div>
      </div>
    </>
  );
}
