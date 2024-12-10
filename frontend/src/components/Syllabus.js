"use client";

import { useState, useEffect } from "react";
import Client from "@/utils/Client";

export default function Syllabus({ sectionid }) {
  const [TAs, setTAs] = useState([]);
  const [overview, setOverview] = useState("");
  const [objective, setObjective] = useState("");
  const [requirement, setRequirement] = useState("");
  const [expectedWeeklyStudyHours, setExpectedWeeklyStudyHours] = useState("");
  const [officeHours, setOfficeHours] = useState("");
  const [textbook, setTextbook] = useState("");
  const [reference, setReference] = useState("");
  const [semester, setSemester] = useState("");
  const [professor, setProfessor] = useState("");
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    const getName = async (e) => {
      try {
        const response = await Client.get(`/api/section/${sectionid}`);
        setTAs(response.data.TAs);
        setOverview(response.data.overview);
        setObjective(response.data.objective);
        setRequirement(response.data.requirement);
        setExpectedWeeklyStudyHours(response.data.expectedWeeklyStudyHours);
        setOfficeHours(response.data.officeHours);
        setTextbook(response.data.textbook);
        setReference(response.data.reference);
        setSemester(response.data.semester);
        setProfessor(response.data.professor);
        setCourseName(response.data.courseName);
      } catch (err) {
        console.log(err);
      }
    };
    getName();
  }, []);

  return (
    <>
      <div className="flex flex-col w-4/5 border-2 border-black bg-white rounded-md items-center justify-between p-8 space-y-5 ml-40 mt-14">
        <div className="w-1/4 flex-col flex justify-center items-center text-2xl font-semibold text-nowrap">
          <div>
            {semester} {courseName}-{professor}
          </div>
          <div className="text-lg">
            TA:
            {TAs.map((ta, index) => (
              <span key={index} className="text-gray-500 pl-2">
                {ta.name}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col justify-start text-xl divide-y-2 divide-gray-400  divide-dashed">
          <div className="flex flex-col space-y-3 p-5">
            <div className="flex items-center space-x-1">
              <svg
                className="h-6 w-6 text-gray-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />{" "}
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
              <div className="text-gray-700 font-semibold">課程概述</div>
            </div>
            <div className="text-base text-wrap">{overview}</div>
          </div>
          <div className="flex flex-col space-y-3 p-5">
            <div className="flex items-center space-x-1">
              <svg
                className="h-6 w-6 text-gray-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />{" "}
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
              <div className="text-gray-700 font-semibold">課程目標</div>
            </div>
            <div className="text-base text-wrap">{objective}</div>
          </div>
          <div className="flex flex-col space-y-3 p-5">
            <div className="flex items-center space-x-1">
              <svg
                className="h-6 w-6 text-gray-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />{" "}
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
              <div className="text-gray-700 font-semibold">課程要求</div>
            </div>
            <div className="text-base text-wrap">{requirement}</div>
          </div>
          <div className="flex flex-col space-y-3 p-5">
            <div className="flex items-center space-x-1">
              <svg
                className="h-6 w-6 text-gray-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />{" "}
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
              <div className="text-gray-700 font-semibold">
                預期每週課後學習時數
              </div>
            </div>
            <div className="text-base text-wrap">
              {expectedWeeklyStudyHours}
            </div>
          </div>
          <div className="flex flex-col space-y-3 p-5">
            <div className="flex items-center space-x-1">
              <svg
                className="h-6 w-6 text-gray-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />{" "}
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
              <div className="text-gray-700 font-semibold">Office Hours</div>
            </div>
            <div className="text-base text-wrap">{officeHours}</div>
          </div>
          <div className="flex flex-col space-y-3 p-5">
            <div className="flex items-center space-x-1">
              <svg
                className="h-6 w-6 text-gray-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />{" "}
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
              <div className="text-gray-700 font-semibold">指定閱讀</div>
            </div>
            <div className="text-base text-wrap">{textbook}</div>
          </div>
          <div className="flex flex-col space-y-3 p-5">
            <div className="flex items-center space-x-1">
              <svg
                className="h-6 w-6 text-gray-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />{" "}
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
              <div className="text-gray-700 font-semibold">參考書目</div>
            </div>
            <div className="text-base text-wrap">{reference}</div>
          </div>
        </div>
      </div>
    </>
  );
}
