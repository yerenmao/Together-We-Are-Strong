"use client";

import SearchBoard from "@/components/SearchBoard";
import Section from "@/components/Section";
import Client from "@/utils/Client";

import { useState } from "react";

export default function Student() {
  const [semester, setSemester] = useState("");
  const [course_name, setCourseName] = useState("");
  const [section_id, setSectionId] = useState("");
  const [department_name, setDepartmentName] = useState("");
  const [dayOptions, setDayOptions] = useState({
    "check-1": false,
    "check-2": false,
    "check-3": false,
    "check-4": false,
    "check-5": false,
    "check-6": false,
  });
  const [timeOptions, setTimeOptions] = useState({
    "check-class1": false,
    "check-class2": false,
    "check-class3": false,
    "check-class4": false,
    "check-class5": false,
    "check-class6": false,
    "check-class7": false,
    "check-class8": false,
    "check-class9": false,
    "check-class10": false,
    "check-class11": false,
    "check-class12": false,
    "check-class13": false,
    "check-class14": false,
    "check-class15": false,
  });
  const [sections, setSections] = useState([]);
  const createParams = () => {
    const params = {
      semester,
      course_name,
      section_id,
      department_name,
      ...Object.keys(dayOptions).reduce((acc, key) => {
        acc[key] = dayOptions[key];
        return acc;
      }, {}),
      ...Object.keys(timeOptions).reduce((acc, key) => {
        acc[key] = timeOptions[key];
        return acc;
      }, {}),
    };

    return params;
  };
  const search = async (e) => {
    e.preventDefault();
    try {
      const response = await Client.get("/api/section/search", {
        params: createParams(),
      });
      setSections(response.data.sections);
      setTimeout(() => {
        window.scrollTo({
          top: window.scrollY + window.innerHeight, // scroll down by the height of the screen
          behavior: "smooth", // smooth scrolling
        });
      }, 100);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-4/5 flex flex-col justify-center items-center ">
          <div className="w-1/2 h-full flex flex-col space-y-10 items-center">
            <SearchBoard
              semester={semester}
              setSemester={setSemester}
              course_name={course_name}
              setCourseName={setCourseName}
              section_id={section_id}
              setSectionId={setSectionId}
              department_name={department_name}
              setDepartmentName={setDepartmentName}
              dayOptions={dayOptions}
              setDayOptions={setDayOptions}
              timeOptions={timeOptions}
              setTimeOptions={setTimeOptions}
              search={search}
            />
          </div>
        </div>
      </div>
      {sections.length > 0 ? (
        <div className="w-full bg-gray-200 p-20">
          <div className="flex flex-col w-full h-full items-center">
            {sections.map((section, index) => (
              <Section key={index} index={index} section={section} />
            ))}
            {/* <SyllabusComponent /> */}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
