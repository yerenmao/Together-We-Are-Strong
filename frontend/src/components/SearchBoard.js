"use client";

import SearchDay from "@/components/SearchDay";
import SearchTime from "@/components/SearchTime";

import { useState } from "react";
import Client from "@utils/Client";

export default function SearchBoard({
  course_name,
  setCourseName,
  section_id,
  setSectionId,
  department_name,
  setDepartmentName,
  dayOptions,
  setDayOptions,
  timeOptions,
  setTimeOptions,
  search,
}) {
  const dayMapper = {
    "check-1": "一",
    "check-2": "二",
    "check-3": "三",
    "check-4": "四",
    "check-5": "五",
    "check-6": "六",
  };
  const timeMapper = {
    "check-class1": "0",
    "check-class2": "1",
    "check-class3": "2",
    "check-class4": "3",
    "check-class5": "4",
    "check-class6": "5",
    "check-class7": "6",
    "check-class8": "7",
    "check-class9": "8",
    "check-class10": "9",
    "check-class11": "10",
    "check-class12": "A",
    "check-class13": "B",
    "check-class14": "C",
    "check-class15": "D",
  };
  return (
    <form onSubmit={search} className="flex flex-col space-y-5 items-center">
      {/* <label className="relative block space-y-5 w-full"> */}
      <span className="sr-only">SearchBar</span>
      <p className="text-center font-bold text-2xl">查詢課程</p>
      <div className="flex justify-center space-x-3">
        <div className="flex flex-col">
          <SearchDay
            selectedOptions={dayOptions}
            setSelectedOptions={setDayOptions}
          />
          <div className="text-center text-sm text-gray-500">
            {Object.entries(dayOptions)
              .filter(([key, value]) => value !== false)
              .map(([key]) => dayMapper[key])
              .join(" , ")}
          </div>
        </div>
        <div className="flex flex-col">
          <SearchTime
            selectedOptions={timeOptions}
            setSelectedOptions={setTimeOptions}
          />
          <div className="text-center text-sm text-gray-500">
            {Object.entries(timeOptions)
              .filter(([key, value]) => value !== false)
              .map(([key]) => timeMapper[key])
              .join(" , ")}
          </div>
        </div>
      </div>
      <input
        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full h-16 border border-slate-300 rounded-3xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-base"
        placeholder="課程名稱"
        type="text"
        value={course_name}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <input
        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full h-16 border border-slate-300 rounded-3xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-base"
        placeholder="課程流水號/課號"
        type="text"
        value={section_id}
        onChange={(e) => setSectionId(e.target.value)}
      />
      <input
        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full h-16 border border-slate-300 rounded-3xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-base"
        placeholder="系所名稱"
        type="text"
        value={department_name}
        onChange={(e) => setDepartmentName(e.target.value)}
      />
      {/* </label> */}
      <button className="bg-gray-700 w-96 h-10 rounded-3xl text-white hover:bg-slate-600">
        查詢
      </button>
    </form>
  );
}
