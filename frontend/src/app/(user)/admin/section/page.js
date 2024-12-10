"use client";

import Section from "@/components/Section";
import { useEffect, useState } from "react";
import Client from "@/utils/Client";

export default function CoursePage() {
  const [semester, setSemester] = useState("113-1");
  const [query, setQuery] = useState("");
  const [sections, setSections] = useState([]);
  const findSections = async (e) => {
    console.log("hi");
    try {
      const response = await Client.get(`/api/section/search/${semester}`);
      console.log(response.data);
      setSections(response.data.sections);
    } catch (err) {
      console.log(err);
    }
  };
  const searchSemester = async (e) => {
    e.preventDefault();
    findSections();
  };
  useEffect(() => {
    findSections();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col pt-20 pb-7">
      <div className="flex flex-col justify-center items-center space-y-4 text-2xl font-semibold text-gray-600 p-8">
        <div>節次 (Section)</div>
        <form
          onSubmit={searchSemester}
          className="w-1/3 flex justify-center relative"
        >
          <input
            className="w-full relative placeholder:italic placeholder:text-slate-400 block bg-white h-16 border border-slate-300 rounded-3xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-base"
            placeholder="學期 (預設: 113-1)"
            type="text"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
          <button
            className="absolute right-2 top-3 text-sm p-2 bg-gray-300 hover:bg-gray-200 border-gray-400 border-2 hover:border-3
           rounded-full"
          >
            Submit
          </button>
        </form>
        <input
          className="w-1/3 relative placeholder:italic placeholder:text-slate-400 block bg-white h-16 border border-slate-300 rounded-3xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-base"
          placeholder="搜尋"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="flex flex-col justify-center items-center space-y-5 w-full h-auto">
        {query === ""
          ? sections.map((section, index) => (
              <Section
                key={index}
                index={index}
                section={section}
                prof={true}
              />
            ))
          : sections
              .filter((section) => section.name.includes(query))
              .map((section, index) => (
                <Section
                  key={index}
                  index={index}
                  section={section}
                  prof={true}
                />
              ))}
      </div>
    </div>
  );
}
