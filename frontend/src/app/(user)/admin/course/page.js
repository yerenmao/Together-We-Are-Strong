"use client";

import Course from "@/components/Course";
import Section from "@/components/Section";

import { useEffect, useState } from "react";
import Client from "@/utils/Client";

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const findCourses = async (e) => {
      try {
        const response = await Client.get("/api/course/search");
        setCourses(response.data.courses);
      } catch (err) {
        console.log(err);
      }
    };
    findCourses();
  }, []);

  return (
    <>
      <div className="w-full min-h-screen flex flex-col pt-20 pb-7">
        <div className="flex flex-col justify-center items-center space-y-4 text-2xl font-semibold text-gray-600 p-8">
          <div>課程 (Course)</div>
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
            ? courses.map((course, index) => (
                <Course key={index} index={index} course={course} />
              ))
            : courses
                .filter((course) => course.name.includes(query))
                .map((course, index) => (
                  <Course key={index} index={index} course={course} />
                ))}
        </div>
      </div>
    </>
  );
}
